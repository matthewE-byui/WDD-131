// ui.js - functions to render builds and UI
export function formatStat(label, value){
return `<div class="stat"><strong>${label}</strong>: ${value}</div>`;
}


export function createBuildCard(build){
const el = document.createElement('div');
el.className = 'card build-card';
el.innerHTML = `
<img src="${build.image}" alt="${build.name}" loading="lazy">
<h3>${build.name}</h3>
<p>${build.description}</p>
<div class="build-meta">
<small>${build.category} · ${build.pieces} parts</small>
<small>⚡ ${build.speed}</small>
</div>
<button class="btn view-btn" aria-label="View ${build.name}" data-id="${build.id}">View</button>
`;
return el;
}


export function showFeatured(build, container){
container.innerHTML = `
<img src="${build.image}" alt="${build.name}" loading="lazy" style="width:100%;height:260px;object-fit:cover;border-radius:8px">
<h3>${build.name}</h3>
<p>${build.description}</p>
<div class="build-meta"><small>Difficulty: ${build.difficulty}</small><small>Top speed: ${build.speed}</small></div>
`;
}

// Lightbox: basic modal with keyboard navigation and focus management
let _items = [];
let _modal = null;
let _current = -1;
let _lastFocus = null;

function ensureModal(){
 if(_modal) return;
 _modal = document.createElement('div');
 _modal.className = 'lightbox';
 _modal.setAttribute('role','dialog');
 _modal.setAttribute('aria-modal','true');
 _modal.innerHTML = `
 <div class="lightbox-overlay"></div>
 <div class="lightbox-panel" role="document">
	 <button class="lb-close" aria-label="Close">✕</button>
	 <button class="lb-prev" aria-label="Previous">‹</button>
	 <div class="lb-content">
		 <img class="lb-image" src="" alt="">
		 <div class="lb-caption"></div>
	 </div>
	 <button class="lb-next" aria-label="Next">›</button>
 </div>
 `;
 document.body.appendChild(_modal);

 _modal.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);
 _modal.querySelector('.lb-close').addEventListener('click', closeLightbox);
 _modal.querySelector('.lb-prev').addEventListener('click', ()=> showIndex(_current - 1));
 _modal.querySelector('.lb-next').addEventListener('click', ()=> showIndex(_current + 1));

 _modal.addEventListener('keydown', (e)=>{
	 if(e.key === 'Escape') closeLightbox();
	 if(e.key === 'ArrowLeft') showIndex(_current - 1);
	 if(e.key === 'ArrowRight') showIndex(_current + 1);
 });
}

function showIndex(idx){
 if(!_items.length) return;
 if(idx < 0) idx = _items.length -1;
 if(idx >= _items.length) idx = 0;
 _current = idx;
 const b = _items[_current];
 const img = _modal.querySelector('.lb-image');
 const cap = _modal.querySelector('.lb-caption');
 img.src = b.image;
 img.alt = b.name;
 cap.textContent = b.caption || '';
}

export function initLightbox(list){
 _items = list.slice();
 ensureModal();
}

export function openLightboxById(id){
 if(!_modal) ensureModal();
 _lastFocus = document.activeElement;
 const idx = _items.findIndex(i => i.id === id);
 showIndex(idx === -1 ? 0 : idx);
 _modal.classList.add('open');
 const panel = _modal.querySelector('.lightbox-panel');
 panel.setAttribute('tabindex','-1');
 panel.focus();
}

export function closeLightbox(){
 if(!_modal) return;
 _modal.classList.remove('open');
 if(_lastFocus) _lastFocus.focus();
}