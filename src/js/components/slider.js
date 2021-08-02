import teamMembers from '../../data/team.json';
import teamSliderTpl from '../../templates/team-slider-markup.hbs';

const refs = {};

let num = 0;

let intervalId = null;

export function initSlider() {
  refs.sliderRoot = document.querySelector('.footer-modal .slider');
  refs.sliderContainer = refs.sliderRoot.querySelector('.footer-modal .slider__outer-wrapper');

  renderSliderMarkup();
  initRefs();
  bindEvents();
  showSlide(num);
}

function initRefs() {
  refs.slides = refs.sliderContainer.querySelectorAll('.slide');
  refs.dots = refs.sliderContainer.querySelectorAll('.slider__dot');
  refs.nextSlide = refs.sliderRoot.querySelector('.footer-modal  [data-action=nextSlide]');
  refs.prevSlide = refs.sliderRoot.querySelector('.footer-modal  [data-action=prevSlide]');
}

function bindEvents() {
  refs.dots.forEach((dot, index) => {
    dot.addEventListener('click', e => {
      showSlide(index);
    });
  });

  refs.nextSlide.addEventListener('click', showNextSlide);
  refs.prevSlide.addEventListener('click', showPrevSlide);
}

function showSlide(n) {
  num = n;

  refs.slides.forEach((slide, index) => {
    if (index === n) {
      slide.classList.add('slide--active');
    } else {
      slide.classList.remove('slide--active');
    }
  });

  turnOffAutoSlider();
  turnOnAutoSlider();
}

function showPrevSlide() {
  num -= 1;
  if (num < 0) num = refs.slides.length - 1;
  showSlide(num);

  turnOffAutoSlider();
  turnOnAutoSlider();
}

function showNextSlide() {
  num += 1;
  if (num >= refs.slides.length) num = 0;
  showSlide(num);

  turnOffAutoSlider();
  turnOnAutoSlider();
}

function renderSliderMarkup() {
  const markup = teamSliderTpl(teamMembers);
  refs.sliderContainer.innerHTML = markup;
}

export function turnOnAutoSlider() {
  intervalId = setInterval(() => {
    showNextSlide();
  }, 5000);
}

export function turnOffAutoSlider() {
  clearInterval(intervalId);
}
