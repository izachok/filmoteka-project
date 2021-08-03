import { renderApp } from './renderer';
import { defineLibraryType } from './defineLibraryType';

const logoEl = document.querySelector('.header-logo');
const navElements = document.getElementsByClassName('navEl');

const routes = [
  { 'page': 'home' },
  { 'page': 'library' }
];

export function initNavigation() {
  [...navElements].forEach(navElement => (navElement.onclick = navChangePage));
}

logoEl.addEventListener('click', () => {
  changePage('home')}
);

function navChangePage(event) {
  const requestedPage = event.currentTarget.getAttribute('page');

  if (!routes.find(({page}) => page === requestedPage)) {
    throw `Unknown page ${requestedPage}`;
  }

  changePage(requestedPage);
}

function changePage(page) {
  const headerImgEL = document.querySelector('.header-section');
  const changableHeaderEL = document.querySelector('.changable-el');
  const mainImgEL = document.querySelector('#main-bgimage')
  changableHeaderEL.remove();
  
  if (page === 'home') {
    pageState.isHome = true;
    headerImgEL.classList.remove('library-header_img');
    headerImgEL.classList.add('home-header_img');
    mainImgEL.classList.remove('library-main-bgimage');
    mainImgEL.classList.add('home-main-bgimage');
  } else {
    pageState.isHome = false;
    headerImgEL.classList.remove('home-header_img');
    headerImgEL.classList.add('library-header_img');
    mainImgEL.classList.remove('home-main-bgimage');
    mainImgEL.classList.add('library-main-bgimage');
  }

  renderApp();
  chageNavElStyle(page);

  if (!pageState.isHome) {
    defineLibraryType();
  }
}

function chageNavElStyle(page) {
  [...navElements].forEach(el => el.classList.remove('active-page'));
  document.querySelector(`[page=${page}]`).classList.add('active-page');
}
