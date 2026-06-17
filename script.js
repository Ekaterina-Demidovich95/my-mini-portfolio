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

if (burger && nav) {
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav__links--open');
    burger.classList.toggle('nav__burger--open', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    document.body.classList.toggle('nav-open', isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav__links--open');
      burger.classList.remove('nav__burger--open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      document.body.classList.remove('nav-open');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      nav.classList.remove('nav__links--open');
      burger.classList.remove('nav__burger--open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      document.body.classList.remove('nav-open');
    }
  });
}
