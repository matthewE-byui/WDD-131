// posts.js - client-side social feed stored in localStorage
const KEY = 'tm_posts_v1';
const LIKES_KEY = 'tm_likes_v1';

const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

const form = document.getElementById('post-form');
const postsEl = document.getElementById('posts');
const titleEl = document.getElementById('title');
const contentEl = document.getElementById('content');
const imageEl = document.getElementById('image');
const idEl = document.getElementById('post-id');
const cancelBtn = document.getElementById('cancel');
const usernameEl = document.getElementById('username');
const avatarEl = document.getElementById('avatar');
const previewEl = document.getElementById('composer-preview');
const demoBtn = document.getElementById('demo-post');
const charCountEl = document.getElementById('char-count');

let posts = [];
let likes = new Set();

function load(){
  try{ posts = JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ posts = []; }
  try{ const l = JSON.parse(localStorage.getItem(LIKES_KEY)) || []; likes = new Set(l); }catch(e){ likes = new Set(); }
}

function save(){
  localStorage.setItem(KEY, JSON.stringify(posts));
  localStorage.setItem(LIKES_KEY, JSON.stringify(Array.from(likes)));
}

function timeAgo(ts){
  const s = Math.floor((Date.now()-ts)/1000);
  if(s<60) return `${s}s`;
  const m = Math.floor(s/60); if(m<60) return `${m}m`;
  const h = Math.floor(m/60); if(h<24) return `${h}h`;
  const d = Math.floor(h/24); return `${d}d`;
}

function render(){
  postsEl.innerHTML = '';
  if(!posts.length) { postsEl.innerHTML = '<p>No posts yet — share something!</p>'; return; }
  posts.slice().reverse().forEach(p => {
    const el = document.createElement('article');
    el.className = 'post';
    const liked = likes.has(p.id);
    el.innerHTML = `
      <div class="post-head"><img class="avatar" src="${escapeAttr(p.avatar||'images/trailmakerslogo.jpg')}" alt="${escapeHtml(p.username||'User')}"><div>
        <div class="post-meta"><strong>${escapeHtml(p.username||'User')}</strong> · <small>${timeAgo(p.created)}</small></div>
        ${p.title? `<h3>${escapeHtml(p.title)}</h3>` : ''}
      </div></div>
      <div class="post-body">${escapeHtml(p.content)}</div>
      ${p.image? `<img class="post-image" src="${escapeAttr(p.image)}" alt="${escapeHtml(p.title||'post image')}">` : ''}
      <div class="post-actions">
        <button class="btn like" data-id="${p.id}">${liked? '♥' : '♡'} ${p.likes || 0}</button>
        <button class="btn comment-toggle" data-id="${p.id}">Comments (${(p.comments||[]).length})</button>
        <button class="btn edit" data-id="${p.id}">Edit</button>
        <button class="btn delete" data-id="${p.id}">Delete</button>
      </div>
      <div class="comments" data-id="${p.id}" style="display:none">
        <div class="comments-list">
          ${(p.comments||[]).map(c=> `<div class="comment"><strong>${escapeHtml(c.author)}</strong> <small>${timeAgo(c.created)}</small><div>${escapeHtml(c.text)}</div></div>`).join('')}
        </div>
        <div style="margin-top:8px;display:flex;gap:8px">
          <input class="comment-input" data-id="${p.id}" placeholder="Write a comment...">
          <button class="btn add-comment" data-id="${p.id}">Add</button>
        </div>
      </div>
    `;
    postsEl.appendChild(el);
  });
}

function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escapeAttr(s){ return String(s||'').replace(/"/g,'&quot;'); }

function updatePreview(){
  const u = usernameEl.value.trim() || 'You';
  const a = avatarEl.value.trim();
  const t = titleEl.value.trim();
  const c = contentEl.value.trim();
  previewEl.innerHTML = `
    <div class="post preview">
      <div class="post-head"><img class="avatar" src="${escapeAttr(a||'images/trailmakerslogo.jpg')}" alt="${escapeHtml(u)}"><div>
        <div class="post-meta"><strong>${escapeHtml(u)}</strong></div>
        ${t? `<h3>${escapeHtml(t)}</h3>` : ''}
      </div></div>
      <div class="post-body">${escapeHtml(c)}</div>
    </div>
  `;
}

function onSubmit(e){
  e.preventDefault();
  const username = usernameEl.value.trim() || 'Anonymous';
  const avatar = avatarEl.value.trim();
  const title = titleEl.value.trim();
  const content = contentEl.value.trim();
  const image = imageEl.value.trim();
  if(!content) return alert('Please enter content');
  const id = idEl.value || String(Date.now());
  const existing = posts.find(p=> p.id === id);
  if(existing){
    existing.title = title; existing.content = content; existing.image = image; existing.username = username; existing.avatar = avatar;
  } else {
    posts.push({id, title, content, image, username, avatar, created: Date.now(), likes:0, comments: []});
  }
  save(); resetForm(); render();
}

function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function createDemoPost(){
  const demoUsers = ['Rover', 'AeroCraft', 'WaveRunner', 'DriftKing', 'Nova'];
  const demoTitles = ['Quick tune I love', 'New lake racer', 'VTOL tweak', 'Lightweight chassis', 'Winged wonder'];
  const demoBodies = [
    'Tuned the suspension for better cornering — feels great!',
    'Tried a new prop setup, much more lift at low throttle.',
    'Reduced weight by 30% and kept stability, surprised me.',
    'Anyone tried reverse-thrust braking? Works well on ice.',
    'Mini spoiler adds extra downforce without slowing top speed.'
  ];
  const username = randomFrom(demoUsers);
  const title = randomFrom(demoTitles);
  const content = randomFrom(demoBodies);
  const avatar = `https://i.pravatar.cc/150?u=${encodeURIComponent(username)}`;
  const image = `https://picsum.photos/seed/${Math.floor(Math.random()*1000)}/800/480`;
  const id = String(Date.now()) + Math.floor(Math.random()*1000);
  posts.push({id, title, content, image, username, avatar, created: Date.now(), likes:0, comments: []});
  save(); render();
}

function resetForm(){
  form.reset(); idEl.value = ''; titleEl.focus(); updatePreview(); charCountEl.textContent = '0';
}

function findPost(id){ return posts.find(p=> p.id === id); }

function onClick(e){
  const btn = e.target.closest && e.target.closest('button');
  if(!btn) return;
  const id = btn.getAttribute('data-id');
  if(btn.classList.contains('like')){
    const p = findPost(id); if(!p) return;
    if(likes.has(id)){ likes.delete(id); p.likes = Math.max(0, (p.likes||0)-1); }
    else { likes.add(id); p.likes = (p.likes||0)+1; }
    save(); render();
  }
  if(btn.classList.contains('comment-toggle')){
    const node = postsEl.querySelector(`.comments[data-id="${id}"]`);
    if(node) node.style.display = node.style.display === 'none' ? 'block' : 'none';
  }
  if(btn.classList.contains('add-comment')){
    const pid = btn.getAttribute('data-id');
    const input = postsEl.querySelector(`.comment-input[data-id="${pid}"]`);
    if(!input) return;
    const text = input.value.trim(); if(!text) return;
    const author = usernameEl.value.trim() || 'Guest';
    const p = findPost(pid); if(!p) return;
    p.comments = p.comments || []; p.comments.push({id: String(Date.now()), author, text, created: Date.now()});
    save(); render();
  }
  if(btn.classList.contains('edit')){
    const p = findPost(id); if(!p) return;
    titleEl.value = p.title || ''; contentEl.value = p.content || ''; imageEl.value = p.image || ''; usernameEl.value = p.username || ''; avatarEl.value = p.avatar || ''; idEl.value = p.id; updatePreview(); titleEl.focus();
  }
  if(btn.classList.contains('delete')){
    if(!confirm('Delete this post?')) return;
    posts = posts.filter(x=> x.id !== id); likes.delete(id); save(); render();
  }
}

function onKeyup(){
  const len = (contentEl.value || '').length; charCountEl.textContent = String(len);
  updatePreview();
}

cancelBtn.addEventListener('click', resetForm);
form.addEventListener('submit', onSubmit);
postsEl.addEventListener('click', onClick);
contentEl.addEventListener('input', onKeyup);
titleEl.addEventListener('input', updatePreview);
usernameEl.addEventListener('input', updatePreview);
avatarEl.addEventListener('input', updatePreview);
if(demoBtn) demoBtn.addEventListener('click', createDemoPost);

load(); render(); updatePreview();

// expose for console/debug
window.tmPosts = {get: ()=> posts, save, load, likes: ()=> Array.from(likes)};
