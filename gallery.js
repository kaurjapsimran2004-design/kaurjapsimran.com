/* ══════════════════════════════════════
   PINTEREST-STYLE GALLERY + LIGHTBOX
   Shared by posters.html and book-covers.html.
   Each page defines its own `galleryImages` array (see the
   <script> block near the bottom of those files) before this
   file runs.
══════════════════════════════════════ */

(function(){
  const grid = document.getElementById('pin-grid');
  if(!grid || typeof galleryImages === 'undefined') return;

  const PREVIEW_COUNT = 8;
  let revealed = Math.min(PREVIEW_COUNT, galleryImages.length);

  function tileHtml(src, i){
    return `<div class="pin-tile sr up" data-i="${i}" tabindex="0" role="button" aria-label="Open image ${i+1}">
      <img src="${src}" alt="${galleryLabel} — image ${i+1}" loading="lazy" onerror="this.parentElement.classList.add('img-missing')"/>
      <div class="pin-tile-placeholder">Add ${src}<small>Portrait mockup recommended</small></div>
      <div class="pin-tile-overlay"><span>View ↗</span></div>
    </div>`;
  }

  function renderGrid(){
    grid.innerHTML = galleryImages.slice(0, revealed).map(tileHtml).join('');
    grid.querySelectorAll('.pin-tile').forEach(tile=>{
      tile.addEventListener('click',()=>openLightbox(parseInt(tile.dataset.i,10)));
      tile.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openLightbox(parseInt(tile.dataset.i,10));});
      revObs.observe(tile);
    });
    const btnWrap = document.getElementById('pin-loadmore-wrap');
    if(revealed < galleryImages.length){
      btnWrap.innerHTML = `<button class="btn btn-ghost" id="pin-loadmore">Load More (${galleryImages.length - revealed}) +</button>`;
      document.getElementById('pin-loadmore').addEventListener('click',()=>{
        revealed = Math.min(revealed + 8, galleryImages.length);
        renderGrid();
      });
    } else {
      btnWrap.innerHTML = '';
    }
  }

  // local scroll-reveal observer (mirrors main.js .sr behavior for dynamically added tiles)
  const revObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}});
  },{threshold:.1});

  /* ── LIGHTBOX ── */
  const lb = document.getElementById('lightbox-overlay');
  let lbIndex = 0;

  function openLightbox(i){
    lbIndex = i;
    renderLightbox();
    lb.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeLightbox(){
    lb.classList.remove('open');
    document.body.style.overflow='';
  }
  function renderLightbox(){
    lbIndex = (lbIndex + galleryImages.length) % galleryImages.length;
    const src = galleryImages[lbIndex];
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-img').alt = `${galleryLabel} — image ${lbIndex+1}`;
    document.getElementById('lightbox-counter').textContent = `${lbIndex+1} / ${galleryImages.length}`;
  }

  document.getElementById('lightbox-close').addEventListener('click',closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click',()=>{lbIndex--;renderLightbox();});
  document.getElementById('lightbox-next').addEventListener('click',()=>{lbIndex++;renderLightbox();});
  lb.addEventListener('click',e=>{if(e.target===lb)closeLightbox();});
  document.addEventListener('keydown',e=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape')closeLightbox();
    if(e.key==='ArrowRight'){lbIndex++;renderLightbox();}
    if(e.key==='ArrowLeft'){lbIndex--;renderLightbox();}
  });

  // simple touch swipe support on the lightbox stage
  let touchStartX = 0;
  const stage = document.getElementById('lightbox-stage');
  stage.addEventListener('touchstart',e=>{touchStartX = e.changedTouches[0].screenX;},{passive:true});
  stage.addEventListener('touchend',e=>{
    const dx = e.changedTouches[0].screenX - touchStartX;
    if(Math.abs(dx) > 40){
      if(dx < 0){lbIndex++;} else {lbIndex--;}
      renderLightbox();
    }
  },{passive:true});

  renderGrid();
})();
