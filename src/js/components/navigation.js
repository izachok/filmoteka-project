import { renderApp } from './renderer';
import { defineLibraryType } from './defineLibraryType';

const navElements = document.getElementsByClassName('navEl');

export function initNavigation() {
  [...navElements].forEach(navElement => (navElement.onclick = changePage));
}

function changePage(event) {
  const headerImgEL = document.querySelector('.header-section');
  const changableHeaderEL = document.querySelector('.changable-el');
  changableHeaderEL.remove();
  const page = event.target.getAttribute('page');
  if (page === 'home') {
    pageState.isHome = true;
    headerImgEL.classList.remove('library-header_img');
    headerImgEL.classList.add('home-header_img');
  } else {
    pageState.isHome = false;
    headerImgEL.classList.remove('home-header_img');
    headerImgEL.classList.add('library-header_img');
  }
  chageNavElStyle(event);
  renderApp();

  if (!pageState.isHome) {
    defineLibraryType();
  }
}

function chageNavElStyle(event) {
  [...navElements].forEach(el => el.classList.remove('active-page'));
  event.currentTarget.classList.add('active-page');
}
