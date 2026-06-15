document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.animationDelay = `${i * 0.08}s`;
});

const currentPage = document.body.dataset.page;
if (currentPage) {
  const activeLink = document.querySelector(`.nav__links a[data-page="${currentPage}"]`);
  if (activeLink) activeLink.classList.add('nav__link--active');
}
