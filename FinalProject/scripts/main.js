import { builds, categories } from './data.js';
import { createBuildCard, showFeatured, initLightbox, openLightboxById } from './ui.js';


const yearEls = document.querySelectorAll('#year, #year-gallery');
yearEls.forEach(e => e.textContent = new Date().getFullYear());


// populate featured
const featuredContainer = document.getElementById('featured-card');
if(featuredContainer){
// Simple daily selection: pick index based on day of year
const now = new Date();
const start = new Date(now.getFullYear(),0,0);
const diff = now - start;
const oneDay = 1000*60*60*24;
const dayOfYear = Math.floor(diff/oneDay);
const idx = dayOfYear % builds.length;
const featured = builds[idx];
showFeatured(featured, featuredContainer);
}

// initialize lightbox with builds for gallery preview
initLightbox(builds);


// preview gallery (home)
const previewGrid = document.getElementById('preview-grid');
if(previewGrid){
builds.slice(0,4).forEach(b => previewGrid.appendChild(createBuildCard(b)));
}


// gallery page setup
const buildGrid = document.getElementById('build-grid');
const filterEl = document.getElementById('filter-category');
const tagEl = document.getElementById('filter-tag');
const sortEl = document.getElementById('sort-by');
const searchEl = document.getElementById('search');


if(filterEl && buildGrid){
// populate filter options
const allOpt = document.createElement('option');
allOpt.value = 'all';
allOpt.textContent = 'All Categories';
filterEl.appendChild(allOpt);
categories.forEach(c => {
const o = document.createElement('option'); o.value = c; o.textContent = capitalize(c); filterEl.appendChild(o);
});

// populate tag options (from builds.tags)
if(tagEl){
	const tagSet = Array.from(new Set(builds.flatMap(b => b.tags || [])));
	const allT = document.createElement('option'); allT.value = 'all'; allT.textContent = 'All Tags'; tagEl.appendChild(allT);
	tagSet.forEach(t => { const o = document.createElement('option'); o.value = t; o.textContent = t; tagEl.appendChild(o); });
}


function renderGrid(items){
buildGrid.innerHTML = '';
items.forEach(b => buildGrid.appendChild(createBuildCard(b)));
}


function getFiltered(){
const q = searchEl?.value.trim().toLowerCase() || '';
let list = builds.slice();
const cat = filterEl.value;
if(cat && cat !== 'all') list = list.filter(b => b.category === cat);
const tag = tagEl?.value;
if(tag && tag !== 'all') list = list.filter(b => (b.tags || []).includes(tag));
if(q) list = list.filter(b => (b.name + ' ' + b.description).toLowerCase().includes(q));
const sortBy = sortEl.value;
if(sortBy === 'speed') list.sort((a,b)=> b.speed - a.speed);
else if(sortBy === 'difficulty') list.sort((a,b)=> b.difficulty - a.difficulty);
else list.sort((a,b)=> a.name.localeCompare(b.name));
return list;
}


renderGrid(getFiltered());


[filterEl, sortEl].forEach(el => el.addEventListener('change', ()=> renderGrid(getFiltered())));
if(searchEl) searchEl.addEventListener('input', ()=> renderGrid(getFiltered()));
}

// delegate view button clicks to open lightbox
document.addEventListener('click', (e)=>{
 const btn = e.target.closest && e.target.closest('.view-btn');
 if(!btn) return;
 e.preventDefault();
 const id = btn.getAttribute('data-id');
 if(id) openLightboxById(id);
});


function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }