import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
function initHamburgerMenu() {
    const hamburger = document.getElementById('js-hamburger');
    const menu = document.getElementById('js-global-menu');
    const body = document.body;
  
    if (!hamburger || !menu) return;
  
    hamburger.addEventListener('click', function () {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      const next = !isExpanded;
  
      this.setAttribute('aria-expanded', String(next));
      this.classList.toggle('is-active', next);
      menu.setAttribute('aria-hidden', String(!next));
      body.classList.toggle('is-drawerActive', next);
      menu.classList.toggle('is-open', next);
    });
  
    // リンククリックで閉じる
    menu.querySelectorAll('.l-hamburger-menu__link, .l-hamburger-menu__btn')
      .forEach(link => {
        link.addEventListener('click', () => {
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('is-active');
          menu.setAttribute('aria-hidden', 'true');
          body.classList.remove('is-drawerActive');
          menu.classList.remove('is-open');
        });
      });
  
    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('is-active');
        menu.setAttribute('aria-hidden', 'true');
        body.classList.remove('is-drawerActive');
        menu.classList.remove('is-open');
      }
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initHeroNews();
  initHamburgerMenu();
  initSwiper();
  initHeaderScroll();
  initPagination();
  initEntryForm();
  initStaffToc();
});

function initHeaderScroll() {
  const header = document.querySelector('.l-header');
  const hero = document.querySelector('.p-hero');
  if (!header || !hero) return;

  const update = () => {
    const scrolled = window.scrollY >= hero.offsetHeight;
    header.classList.toggle('is-scrolled', scrolled);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

// Hero スライダー
function initHeroSlider() {
  const slides = document.querySelectorAll('.p-hero__slide');
  if (slides.length < 2) return; // 2枚未満なら何もしない

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  }, 4000);
}

// Hero NEWS（最新ブログ記事を1件取得）
function initHeroNews() {
  const newsLink = document.getElementById('js-hero-news');
  if (!newsLink) return;

  // WordPress化後はREST APIに差し替える
  // 現在はダミーデータで表示
  const dummyNews = {
    title: '新入社員向けに、入社前研修を行いました。',
    url: '/blog/sample.html'
  };

  newsLink.href = dummyNews.url;
  newsLink.querySelector('.p-hero__news-text').textContent = dummyNews.title;
}

function initPagination() {
  const links = document.querySelectorAll('.p-pagination__link');
  const items = document.querySelectorAll('.p-blog__item');
  if (!links.length || !items.length) return;

  const ITEMS_PER_PAGE = 8;

  function showPage(page) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    items.forEach((item, i) => {
      item.style.display = (i >= start && i < end) ? '' : 'none';
    });
    links.forEach((link, i) => {
      const isActive = i === page - 1;
      link.classList.toggle('p-pagination__link--active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  showPage(1);

  links.forEach((link, i) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(i + 1);
      document.querySelector('.p-blog-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initSwiper() {
  // aboutスライダー（止まらずに流れ続ける）
  const aboutSlider = document.querySelector('.p-about__slider');
  if (aboutSlider) {
    new Swiper('.p-about__slider', {
      modules: [Autoplay],
      slidesPerView: 2.5,
      spaceBetween: 20,
      loop: true,
      speed: 4000,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      breakpoints: {
        375: {
          slidesPerView: 1.35,
          spaceBetween: 16,
        },
        426: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2.2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 32,
        },
      },
    });
  }

  // memberスライダー
  const memberSlider = document.querySelector('.p-member__slider');
  if (memberSlider) {
    new Swiper('.p-member__slider', {
      modules: [Navigation],
      slidesPerView: 'auto',
      spaceBetween: 44,
      loop: true,
      autoplay: false,
      allowTouchMove: true,
      navigation: {
        nextEl: '.p-member__nav-btn--next',
        prevEl: '.p-member__nav-btn--prev',
      },
      breakpoints: {
        0: {
          spaceBetween: 23,
        },
        768: {
          spaceBetween: 24,
        },
        1024: {
          spaceBetween: 44,
        },
      },
    });
  }
}

function initStaffToc() {
  const tocLinks = document.querySelectorAll('.p-staff-interview__toc-link');
  if (!tocLinks.length) return;

  const sections = Array.from(document.querySelectorAll('.p-staff-interview__section[id]'));
  if (!sections.length) return;

  const ACTIVE_CLASS = 'p-staff-interview__toc-link--active';

  // smooth scroll on click (PC only)
  tocLinks.forEach(link => {
    link.addEventListener('click', e => {
      if (window.innerWidth < 1024) return;
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const headerH = document.querySelector('.l-header')?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  function updateActive() {
    if (window.innerWidth < 1024) return;
    const headerH = document.querySelector('.l-header')?.offsetHeight ?? 0;
    const scrollY = window.scrollY;
    let current = sections[0].id;
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top + scrollY - headerH - 40;
      if (scrollY >= top) current = section.id;
    });
    tocLinks.forEach(link => {
      link.classList.toggle(ACTIVE_CLASS, link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
}

function initEntryForm() {
  const form = document.getElementById('js-entry-form');
  const btn = document.getElementById('js-entry-submit');
  if (!form || !btn) return;

  function validate() {
    const textInputs = form.querySelectorAll('input[required]:not([type="radio"]):not([type="checkbox"])');
    const radioName = 'job';
    const privacyCheckbox = form.querySelector('#entry-privacy');
    const selects = form.querySelectorAll('select[required]');
    const textarea = form.querySelector('textarea[required]');

    const allTextFilled = Array.from(textInputs).every(el => el.value.trim() !== '');
    const radioSelected = form.querySelector(`input[name="${radioName}"]:checked`) !== null;
    const allSelectsFilled = Array.from(selects).every(el => el.value !== '');
    const textareaFilled = textarea ? textarea.value.trim() !== '' : true;
    const privacyChecked = privacyCheckbox ? privacyCheckbox.checked : false;

    btn.disabled = !(allTextFilled && radioSelected && allSelectsFilled && textareaFilled && privacyChecked);
  }

  form.addEventListener('input', validate);
  form.addEventListener('change', validate);
}