// main.js — renders recipes and handles search + tags

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

    body.appendChild(tagsWrap);
    body.appendChild(h2);
    body.appendChild(meta);
    body.appendChild(desc);

    card.appendChild(fig);
    card.appendChild(body);
    listEl.appendChild(card);
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
