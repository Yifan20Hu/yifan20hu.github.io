const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    }
  });
}

// Direct links from the homepage open the corresponding research area.
function openResearchAreaFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const area = id && document.getElementById(id);
  if (area?.matches('details.research-area')) area.open = true;
}

window.addEventListener('hashchange', openResearchAreaFromHash);
openResearchAreaFromHash();
