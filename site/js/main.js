'use strict';

const menuButton = document.querySelector('.hero__menu');
const nav = document.querySelector('.hero__nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.classList.toggle('is-open');
    nav.classList.toggle('is-open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}
