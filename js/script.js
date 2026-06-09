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
            slidesPerView: 1.5,
            spaceBetween: 20,
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
      slidesPerView: 3,
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
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2.5,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 44,
        },
      },
    });
  }
}