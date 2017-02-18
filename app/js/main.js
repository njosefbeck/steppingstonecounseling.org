'use strict';

// Smooth scrolling functionality
smoothScroll.init({
    easing: 'easeOutCubic'
});

// Mobile navigation functionality
const hamburger = document.querySelector('.js-hamburger');
const nav = document.querySelector('nav ul');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}