// posts-preview.js - render a small preview of recent posts from localStorage
(function(){
  const KEY = 'tm_posts_v1';
  const container = document.getElementById('posts-preview');
  if(!container) return;

  function load(){
    try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; }
  }

  function timeAgo(ts){
    const s = Math.floor((Date.now()-ts)/1000);
    if(s<60) return `${s}s`;
    const m = Math.floor(s/60); if(m<60) return `${m}m`;
    const h = Math.floor(m/60); if(h<24) return `${h}h`;
    const d = Math.floor(h/24); return `${d}d`;
  }

  function makeCard(p){
    const el = document.createElement('article');
    el.className = 'card';
    const title = p.title ? `<strong>${escapeHtml(p.title)}</strong>` : '';
    const excerpt = (p.content||'').length > 120 ? escapeHtml((p.content||'').slice(0,120)) + '…' : escapeHtml(p.content||'');
    el.innerHTML = `
      <div style="display:flex;gap:10px;align-items:center">
        <img src="${escapeAttr(p.avatar||'images/trailmakerslogo.jpg')}" alt="${escapeHtml(p.username||'User')}" style="width:48px;height:48px;border-radius:50%;object-fit:cover">
        <div>
          <div style="font-size:14px;color:#cfd8dc"><strong>${escapeHtml(p.username||'User')}</strong> · <small style="color:#9aa3ab">${timeAgo(p.created)}</small></div>
          <div style="margin-top:6px">${title}</div>
          <div style="color:#9aa3ab;margin-top:6px">${excerpt}</div>
        </div>
      </div>
    `;
    el.addEventListener('click', ()=> window.location.href = 'posts.html');
    return el;
  }

  function escapeHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function escapeAttr(s){ return String(s||'').replace(/"/g,'&quot;'); }

  const posts = load();
  if(!posts.length){ container.innerHTML = '<div class="card">No posts yet. <a href="posts.html">Be the first</a></div>'; return; }
  const recent = posts.slice(-3);
  recent.reverse().forEach(p => container.appendChild(makeCard(p)));
})();
