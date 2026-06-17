document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.animationDelay = `${i * 0.08}s`;
});

const currentPage = document.body.dataset.page;
if (currentPage) {
  const activeLink = document.querySelector(`.nav__links a[data-page="${currentPage}"]`);
  if (activeLink) activeLink.classList.add('nav__link--active');
}

const burger = document.querySelector('.nav__burger');
const nav = document.querySelector('.nav__links');

function closeNav() {
  if (!nav || !burger) return;
  nav.classList.remove('nav__links--open');
  burger.classList.remove('nav__burger--open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Открыть меню');
  document.body.classList.remove('nav-open');
}

if (burger && nav) {
  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = nav.classList.toggle('nav__links--open');
    burger.classList.toggle('nav__burger--open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    document.body.classList.toggle('nav-open', isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('nav__links--open')) return;
    if (nav.contains(e.target) || burger.contains(e.target)) return;
    closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeNav();
    }
  });
}
