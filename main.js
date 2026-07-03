/* ══════════════════════════════════════
   JAPSIMRAN KAUR — PORTFOLIO
   Shared behavior across all pages
══════════════════════════════════════ */

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}});
},{threshold:.12});
document.querySelectorAll('.sr').forEach(el=>revObs.observe(el));

/* ── SKILL BAR ANIMATION (about page only) ── */
const aboutSec = document.getElementById('about');
if(aboutSec){
  const skillObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('.skill-fill').forEach(bar=>{
          const w = parseFloat(bar.dataset.w)||.8;
          bar.style.transform=`scaleX(${w})`;
          bar.classList.add('animate');
        });
      }
    });
  },{threshold:.2});
  skillObs.observe(aboutSec);
}

/* ── ACTIVE NAV (highlights current page in sidebar / mobile nav) ── */
const navLinks = document.querySelectorAll('.sidebar-nav a, .mobile-nav a');
const currentPage = (document.body.dataset.page)||'home';
navLinks.forEach(a=>{
  a.classList.toggle('active', a.dataset.section===currentPage);
});

/* ── CONTACT FORM (contact page only) ── */
const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Connect this form to Formspree or Netlify Forms to receive messages.');
  });
}
