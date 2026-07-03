/* ══════════════════════════════════════
   PROJECT DATA + MODAL LOGIC
   Used on work.html — opens a full-screen case-study view
   for the three flagship projects. The Posters and Book Covers
   projects are NOT here — they live on their own Pinterest-style
   gallery pages (posters.html / book-covers.html), see gallery.js.
══════════════════════════════════════ */

/*
  ════════════════════════════════════════════════════════════════
  HOW TO EDIT THIS FILE
  ════════════════════════════════════════════════════════════════
  Each project has an `images` array — add as many as you like, but
  4 is the sweet spot. The modal turns them into a real horizontally
  scrollable/swipeable strip (mouse-drag, trackpad, or finger swipe
  all work) with dots + arrows once there's more than one image.

  Recommended: 4 images per project, 1200×900px (4:3), named like:
    images/uncle-green-01.jpg
    images/uncle-green-02.jpg
    images/uncle-green-03.jpg
    images/uncle-green-04.jpg

  Replace `challenge` / `approach` / `outcome` with the real writeup
  text copied from your Behance project description. Keep them as
  plain strings (no HTML needed).

  `behance` is the link used by the "See the Process on Behance"
  button at the bottom of the modal.
  ════════════════════════════════════════════════════════════════
*/

const projects = {
  p1:{
    slug:'uncle-green',
    tag:'Brand Identity',
    title:'Uncle Green',
    behance:'https://www.behance.net/gallery/245715415/Uncle-Green',
    images:[
      'images/uncle-green-01.jpg',
      'images/uncle-green-02.jpg',
      'images/uncle-green-03.jpg',
      'images/uncle-green-04.jpg'
    ],
    meta:[
      {label:'Category',value:'Brand Identity'},
      {label:'Deliverables',value:'Logo, Visual System, Collateral'},
      {label:'Tools',value:'Adobe Illustrator'}
    ],
    challenge:'Create a brand that feels warm, approachable, and distinctly personal — one that doesn\'t look like it came from a template and can hold up across both print and digital applications.',
    approach:'I started with the personality first: what does Uncle Green feel like to be around? Warm, a little witty, trustworthy. The visual system was built from that character outward — a logo mark that carries personality without being decorative, a colour palette rooted in warmth, and typography that balances friendliness with structure.',
    outcome:'A complete brand identity with logo system, colour palette, typography direction, and collateral mockups. The result feels polished, warm, and genuinely distinct from the category default.'
  },
  p2:{
    slug:'doodling',
    tag:'Illustration',
    title:'Doodling',
    behance:'https://www.behance.net/gallery/245715959/Doodling',
    images:[
      'images/doodling-01.jpg',
      'images/doodling-02.jpg',
      'images/doodling-03.jpg',
      'images/doodling-04.jpg'
    ],
    meta:[
      {label:'Category',value:'Illustration'},
      {label:'Medium',value:'Hand-drawn & Digital'},
      {label:'Tools',value:'Illustrator, Photoshop'}
    ],
    challenge:'Illustration is where the rest of my practice comes from. This project is about capturing and presenting the hand-drawn energy, expressive line work, and character development that inform every branding or editorial project I take on.',
    approach:'No brief, no client — just drawing. I worked in spreads and series, exploring faces, textures, patterns, and moments. The goal was expressive honesty: work that feels like it was made by a person, not generated.',
    outcome:'A body of illustration work that shows range — from tight character design to loose gestural work — and acts as a visual vocabulary I draw from in every other discipline.'
  },
  p3:{
    slug:'lunch-box',
    tag:'Web Design',
    title:'Lunch Box',
    behance:'https://www.behance.net/gallery/245711833/Lunch-Box-Food-Delivery-Landing-Page-Design',
    images:[
      'images/lunch-box-01.jpg',
      'images/lunch-box-02.jpg',
      'images/lunch-box-03.jpg',
      'images/lunch-box-04.jpg'
    ],
    meta:[
      {label:'Category',value:'Web Design / UI'},
      {label:'Deliverables',value:'Landing Page Design'},
      {label:'Tools',value:'Figma'}
    ],
    challenge:'Design a landing page for a food delivery brand that feels modern and digital-first, while still communicating warmth and appetite appeal. Avoid the generic food-app template: clean cards, stock photography, pastel backgrounds.',
    approach:'I treated the page as a typographic system first — establishing a strong visual hierarchy through scale, weight, and negative space — then brought in photography and illustration as supporting layers rather than the primary vehicle.',
    outcome:'A landing page concept that feels intentional from headline to footer: clear hierarchy, deliberate rhythm, and a visual approach that gives the brand personality without over-designing it.'
  }
};

/* ── MODAL LOGIC ── */
const overlay = document.getElementById('modal-overlay');
let carouselIndex = 0;
let activeProject = null;

function renderCarousel(p){
  const wrap = document.getElementById('modal-hero');
  const imgs = p.images && p.images.length ? p.images : [];
  carouselIndex = 0;

  const slidesHtml = imgs.map((src,i)=>
    `<div class="modal-slide" data-i="${i}">
       <img src="${src}" alt="${p.title} — image ${i+1}" onerror="this.parentElement.classList.add('img-missing')"/>
       <div class="modal-slide-placeholder">Add ${src}<small>1200×900px recommended</small></div>
     </div>`
  ).join('');

  const dotsHtml = imgs.length>1
    ? `<div class="modal-carousel-dots">${imgs.map((_,i)=>`<button class="modal-dot${i===0?' is-active':''}" data-i="${i}" aria-label="Image ${i+1}"></button>`).join('')}</div>`
    : '';

  const arrowsHtml = imgs.length>1
    ? `<button class="modal-arrow modal-arrow-prev" id="modal-prev" aria-label="Previous image">‹</button>
       <button class="modal-arrow modal-arrow-next" id="modal-next" aria-label="Next image">›</button>`
    : '';

  const hintHtml = imgs.length>1
    ? `<span class="modal-scroll-hint">← Scroll through ${imgs.length} images →</span>` : '';

  wrap.innerHTML = `
    <div class="modal-carousel" id="modal-carousel-track">${slidesHtml}</div>
    ${arrowsHtml}
    <span id="modal-tag" class="modal-tag"></span>
    <button class="modal-close" id="modal-close" aria-label="Close and go back">✕</button>
    ${dotsHtml}
    ${hintHtml}
  `;

  // re-bind close (it was replaced via innerHTML)
  document.getElementById('modal-close').addEventListener('click',closeModal);

  const track = document.getElementById('modal-carousel-track');

  if(imgs.length>1){
    document.getElementById('modal-prev').addEventListener('click',()=>goToSlide(carouselIndex-1));
    document.getElementById('modal-next').addEventListener('click',()=>goToSlide(carouselIndex+1));
    wrap.querySelectorAll('.modal-dot').forEach(dot=>{
      dot.addEventListener('click',()=>goToSlide(parseInt(dot.dataset.i,10)));
    });
    // keep dots/hint in sync while the person scrolls/swipes the strip directly
    let scrollTimeout;
    track.addEventListener('scroll',()=>{
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(()=>{
        const i = Math.round(track.scrollLeft / track.clientWidth);
        setActiveDot(i);
      },80);
    });
    // hide the scroll hint once the person has actually scrolled once
    track.addEventListener('scroll',function hideHint(){
      const hint = wrap.querySelector('.modal-scroll-hint');
      if(hint) hint.style.opacity='0';
      track.removeEventListener('scroll',hideHint);
    },{once:true});
  }

  document.getElementById('modal-tag').textContent = p.tag;
}

function setActiveDot(i){
  const wrap = document.getElementById('modal-hero');
  const dots = wrap.querySelectorAll('.modal-dot');
  const slides = wrap.querySelectorAll('.modal-slide');
  if(!slides.length) return;
  carouselIndex = (i + slides.length) % slides.length;
  dots.forEach((d,idx)=>d.classList.toggle('is-active', idx===carouselIndex));
}

function goToSlide(i){
  const wrap = document.getElementById('modal-hero');
  const track = document.getElementById('modal-carousel-track');
  const slides = wrap.querySelectorAll('.modal-slide');
  if(!slides.length) return;
  const target = (i + slides.length) % slides.length;
  track.scrollTo({left: target * track.clientWidth, behavior:'smooth'});
  setActiveDot(target);
}

/* slug -> project id lookup, used for shareable /work.html#slug URLs */
const slugToId = Object.fromEntries(Object.entries(projects).map(([id,p])=>[p.slug,id]));
const baseTitle = document.title;

function openModal(id, opts){
  const options = opts || {};
  const p = projects[id];
  if(!p)return;
  activeProject = p;

  renderCarousel(p);
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-challenge').textContent = p.challenge;
  document.getElementById('modal-approach').textContent = p.approach;
  document.getElementById('modal-outcome').textContent = p.outcome;

  // meta
  const meta = document.getElementById('modal-meta');
  meta.innerHTML = p.meta.map(m=>`<div class="modal-meta-item"><small>${m.label}</small><strong>${m.value}</strong></div>`).join('');

  // footer — single, project-specific Behance link
  const footer = document.getElementById('modal-footer');
  footer.innerHTML = `
    <a class="btn btn-solid" href="${p.behance}" target="_blank" rel="noopener">See the Process on Behance ↗</a>
    <button class="btn btn-ghost" id="close-btn-footer">← Back to Work</button>
  `;
  document.getElementById('close-btn-footer').addEventListener('click',closeModal);

  overlay.classList.add('open');
  document.body.style.overflow='hidden';

  document.title = `${p.title} — Japsimran Kaur`;
  if(!options.fromHash && window.location.hash.slice(1) !== p.slug){
    history.pushState({modal:p.slug}, '', `#${p.slug}`);
  }
}

function closeModal(){
  overlay.classList.remove('open');
  document.body.style.overflow='';
  document.title = baseTitle;
  if(window.location.hash){
    history.pushState({}, '', window.location.pathname + window.location.search);
  }
}

if(overlay){
  overlay.addEventListener('click',e=>{if(e.target===overlay)closeModal();});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape')closeModal();
    if(!overlay.classList.contains('open')) return;
    if(e.key==='ArrowRight') goToSlide(carouselIndex+1);
    if(e.key==='ArrowLeft') goToSlide(carouselIndex-1);
  });

  document.querySelectorAll('.proj-card').forEach(card=>{
    const id = card.dataset.modal;
    const p = projects[id];
    // give each card a real, crawlable/shareable link as well as the click handler
    if(p && p.slug) card.dataset.href = `work.html#${p.slug}`;
    card.addEventListener('click',()=>openModal(id));
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')openModal(id);});
  });

  // deep-link support: work.html#uncle-green opens straight to that case study
  function openFromHash(){
    const slug = window.location.hash.slice(1);
    const id = slugToId[slug];
    if(id) openModal(id, {fromHash:true});
    else if(overlay.classList.contains('open')) closeModal();
  }
  window.addEventListener('popstate', openFromHash);
  if(window.location.hash) openFromHash();
}
