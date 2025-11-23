// main.js — renders recipes and handles search + tags (with Show More toggle)

import { recipes } from './recipes.mjs';

// Get DOM elements
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const listEl = document.getElementById('recipes-list');

// Create accessible rating stars
function createRating(rating) {
  const span = document.createElement('span');
  span.className = 'rating';
  span.setAttribute('role', 'img');
  span.setAttribute('aria-label', `Rating: ${rating} out of 5 stars`);
  
  for (let i = 1; i <= 5; i++) {
    const starSpan = document.createElement('span');
    starSpan.setAttribute('aria-hidden', 'true');
    if (i <= rating) {
      starSpan.className = 'icon-star';
      starSpan.textContent = '⭐';
    } else {
      starSpan.className = 'icon-star-empty';
      starSpan.textContent = '☆';
    }
    span.appendChild(starSpan);
  }
  
  return span;
}

// Add show-more toggle behavior: shows button only if text overflows its clamped height
function attachShowMore(descEl, btnEl) {
  // measure overflow after layout (descEl must be in DOM)
  function updateButtonVisibility() {
    // If the element's scrollHeight is greater than its clientHeight, it overflows
    const isOverflowing = descEl.scrollHeight > descEl.clientHeight + 1; // tolerance
    btnEl.style.display = isOverflowing ? 'inline-block' : 'none';
  }

  // toggle expand/collapse
  btnEl.addEventListener('click', () => {
    const expanded = descEl.classList.toggle('expanded');
    btnEl.textContent = expanded ? 'Show Less' : 'Show More';
  });

  // initial check after next frame (ensures styles applied)
  requestAnimationFrame(updateButtonVisibility);

  // also update when window resizes (clamp height changes)
  const ro = new ResizeObserver(() => {
    updateButtonVisibility();
  });
  ro.observe(descEl);
  // store observer on element so it can be disconnected if needed later
  descEl._showMoreObserver = ro;
}

// Render recipes
function render(recipesToRender) {
  listEl.innerHTML = ''; // Clear list
  
  for (const r of recipesToRender) {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.setAttribute('tabindex', '0');

    const fig = document.createElement('figure');
    fig.className = 'recipe-figure';
    const img = document.createElement('img');
    img.src = r.image;
    img.alt = r.title + ' — image';
    fig.appendChild(img);

    const body = document.createElement('div');
    body.className = 'recipe-body';

    // tags
    const tagsWrap = document.createElement('div');
    tagsWrap.className = 'tags';
    r.tags.forEach(t => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = t;
      btn.addEventListener('click', () => {
        input.value = t; // set search to tag
        handleSearch(t);
      });
      tagsWrap.appendChild(btn);
    });

    const h2 = document.createElement('h3');
    h2.className = 'recipe-title';
    h2.textContent = r.title;

    const ratingEl = createRating(r.rating);
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.appendChild(ratingEl);
    const reviews = document.createElement('span');
    reviews.style.marginLeft = '8px';
    reviews.style.color = '#666';
    reviews.textContent = `${r.reviews} reviews`;
    meta.appendChild(reviews);

    const desc = document.createElement('p');
    desc.className = 'description';
    desc.textContent = r.description;

    // Show More button
    const showBtn = document.createElement('button');
    showBtn.type = 'button';
    showBtn.className = 'show-more-btn';
    showBtn.textContent = 'Show More';
    showBtn.style.display = 'none'; // default hidden; attachShowMore will show if needed

    body.appendChild(tagsWrap);
    body.appendChild(h2);
    body.appendChild(meta);
    body.appendChild(desc);
    body.appendChild(showBtn);

    card.appendChild(fig);
    card.appendChild(body);
    listEl.appendChild(card);

    // After element is inserted, attach Show More logic (measures overflow)
    // Use requestAnimationFrame to ensure browser has applied layout/styles
    requestAnimationFrame(() => {
      attachShowMore(desc, showBtn);
    });
  }
}

// Simple search handler
function handleSearch(query) {
  query = (query || input.value || '').trim().toLowerCase();
  const out = recipes.filter(r => {
    if (!query) return true;
    const inTitle = r.title.toLowerCase().includes(query);
    const inTags = r.tags.join(' ').toLowerCase().includes(query);
    const inDesc = r.description.toLowerCase().includes(query);
    return inTitle || inTags || inDesc;
  });

  // sort alphabetically by title
  out.sort((a, b) => a.title.localeCompare(b.title));
  render(out);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSearch();
});

input.addEventListener('input', () => {
  // live filter as you type (keeps it responsive)
  handleSearch();
});

// Initial render
render(recipes);
