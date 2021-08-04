import { renderApp } from './renderer';
import { defineLibraryType } from './defineLibraryType';
import { renderBtnToClear, removeBtnToClear} from './to-trash-btn';

const logoEl = document.querySelector('.header-logo');
const navElements = document.getElementsByClassName('navEl');

const routes = [
  { 'page': 'home' },
  { 'page': 'library' }
];

function initNavigation() {
  [...navElements].forEach(navElement => (navElement.onclick = navChangePage));
}

logoEl.addEventListener('click', () => {
  changePage('home')}
);

function navChangePage(event) {
  const requestedPage = event.currentTarget.getAttribute('data-page');

  if (!routes.find(({page}) => page === requestedPage)) {
    throw `Unknown page ${requestedPage}`;
  }

  changePage(requestedPage);
}

function changePage(page) {
  const headerImgEL = document.querySelector('.header-section');
  const changableHeaderEL = document.querySelector('.changable-el');
  changableHeaderEL.remove();
  
  if (page === 'home') {
    pageState.isHome = true;
    headerImgEL.classList.remove('library-header_img');
    headerImgEL.classList.add('home-header_img');
    removeBtnToClear();
  } else {
    pageState.isHome = false;
    headerImgEL.classList.remove('home-header_img');
    headerImgEL.classList.add('library-header_img');
    renderBtnToClear();
  }

  renderApp();
  chageNavElStyle(page);

  if (!pageState.isHome) {
    defineLibraryType();
  }
}

function chageNavElStyle(page) {
  [...navElements].forEach(el => el.classList.remove('active-page'));
  document.querySelector(`[data-page=${page}]`).classList.add('active-page');
}

export {changePage, initNavigation};