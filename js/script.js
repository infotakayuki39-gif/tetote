// tetote JavaScript
console.log('tetote site loaded');
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
  initHamburgerMenu();
});