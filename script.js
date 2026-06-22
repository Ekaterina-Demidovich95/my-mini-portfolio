document.querySelectorAll('.hero .fade-in').forEach((el, i) => {
  el.style.animationDelay = `${i * 0.12}s`;
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

/* ===== Scroll reveal ===== */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((section) => {
    revealObserver.observe(section);
  });

  document.querySelectorAll('.reveal-stagger').forEach((el) => {
    if (el.closest('.reveal-on-scroll')) return;

    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          staggerObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    staggerObserver.observe(el);
  });
} else {
  document.querySelectorAll('.reveal-on-scroll, .reveal-stagger').forEach((el) => {
    el.classList.add('is-visible');
  });
}

/* ===== Stagger testimonials carousel ===== */
const testimonialsData = [
  {
    text: 'Я наконец поняла, кто мои клиенты и как выстраивать путь до записи. Всё стало логично и понятно.',
    tag: 'Нейромаркетинг',
    icon: '🧠',
  },
  {
    text: 'Заказывала нейрофотосессию в честь дня рождения, и осталась в полном восторге! Фотографии получились очень красивые, яркие и необычные — именно такие, как я хотела. Спасибо за внимательное отношение, оперативность и такой креативный подход!',
    tag: 'AI-визуалы',
    icon: '🎨',
  },
  {
    text: 'Видео получилось даже лучше, чем я ожидала. Использовала в соцсетях — отлично зашло аудитории.',
    tag: 'AI-видео',
    icon: '🎬',
  },
  {
    text: 'Очень понравился визуал для профиля, это не просто красивые картинки, а прям с мыслью. После визуалов профиль стал выглядеть совсем по-другому.',
    tag: 'Оформление профиля',
    icon: '✨',
  },
  {
    text: 'Мне объяснили, почему мои услуги не покупают так, как я ожидала. И главное — что с этим делать. Стало намного понятнее, куда двигаться.',
    tag: 'Консультация',
    icon: '💡',
  },
  {
    text: 'Заказывала песню в честь свадьбы сына — и результат превзошёл все ожидания. Получилось очень красиво, нежно и по-настоящему празднично. Гости были растроганы, а молодожёны слушали со слезами на глазах.',
    tag: 'AI-музыка',
    icon: '🎵',
  },
];

function initTestimonialsCarousel() {
  const carousel = document.getElementById('testimonials-carousel');
  const stage = document.getElementById('testimonials-stage');
  if (!carousel || !stage) return;

  let order = testimonialsData.map((_, i) => i);
  let cardSize = getCardSize();

  function getCardSize() {
    const stageWidth = stage.clientWidth || window.innerWidth;
    if (window.innerWidth <= 430) return Math.min(300, stageWidth - 32);
    if (window.innerWidth <= 768) return Math.min(320, stageWidth - 48);
    return Math.min(360, stageWidth - 80);
  }

  function getPosition(index, total) {
    return total % 2 ? index - (total + 1) / 2 : index - total / 2;
  }

  function renderCards() {
    cardSize = getCardSize();
    stage.innerHTML = '';
    const total = order.length;

    order.forEach((dataIndex, listIndex) => {
      const item = testimonialsData[dataIndex];
      const position = getPosition(listIndex, total);
      const isCenter = position === 0;
      const card = document.createElement('article');
      card.className = `testimonial-card${isCenter ? ' testimonial-card--center' : ''}`;
      card.dataset.position = String(position);
      card.style.width = `${cardSize}px`;
      card.style.minHeight = `${Math.min(cardSize, 320)}px`;
      card.style.transform = getCardTransform(position, isCenter);
      card.style.opacity = Math.abs(position) > 2 ? '0' : String(1 - Math.abs(position) * 0.18);
      card.style.pointerEvents = Math.abs(position) > 2 ? 'none' : 'auto';
      card.style.zIndex = String(10 - Math.abs(position));

      card.innerHTML = `
        <div class="testimonial-card__avatar" aria-hidden="true">${item.icon}</div>
        <p class="testimonial-card__text">«${item.text}»</p>
        <p class="testimonial-card__tag">— ${item.tag}</p>
      `;

      card.addEventListener('click', () => {
        if (position === 0) return;
        moveCards(position);
      });

      stage.appendChild(card);
    });
  }

  function getCardTransform(position, isCenter) {
    const offsetX = (cardSize / 1.45) * position;
    const offsetY = isCenter ? -24 : position % 2 ? 12 : -12;
    const rotate = isCenter ? 0 : position % 2 ? 2.5 : -2.5;
    const scale = isCenter ? 1 : 1 - Math.min(Math.abs(position) * 0.04, 0.12);
    return `translate(-50%, -50%) translateX(${offsetX}px) translateY(${offsetY}px) rotate(${rotate}deg) scale(${scale})`;
  }

  function moveCards(steps) {
    const newOrder = [...order];
    if (steps > 0) {
      for (let i = steps; i > 0; i -= 1) {
        const shifted = newOrder.shift();
        if (shifted === undefined) return;
        newOrder.push(shifted);
      }
    } else {
      for (let i = steps; i < 0; i += 1) {
        const shifted = newOrder.pop();
        if (shifted === undefined) return;
        newOrder.unshift(shifted);
      }
    }
    order = newOrder;
    renderCards();
  }

  carousel.querySelectorAll('[data-dir]').forEach((btn) => {
    btn.addEventListener('click', () => {
      moveCards(Number(btn.dataset.dir));
    });
  });

  let touchStartX = 0;
  stage.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  stage.addEventListener(
    'touchend',
    (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) < 50) return;
      moveCards(diff < 0 ? 1 : -1);
    },
    { passive: true }
  );

  document.addEventListener('keydown', (e) => {
    if (!carousel.matches(':hover') && document.activeElement?.closest('#testimonials-carousel') == null) return;
    if (e.key === 'ArrowLeft') moveCards(-1);
    if (e.key === 'ArrowRight') moveCards(1);
  });

  window.addEventListener('resize', renderCards);
  renderCards();
}

initTestimonialsCarousel();
