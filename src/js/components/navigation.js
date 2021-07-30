import { renderApp } from "./renderer";
import { pageState } from "./pageState";
import { defineLibraryType } from "./defineLibraryType"

const navElements = document.getElementsByClassName('navEl');

export function initNavigation() {
  [...navElements].forEach(navElement=>navElement.onclick = changePage);
}

function changePage(event) {
  const headerImgEL = document.querySelector('.header-section');
  const changableHeaderEL = document.querySelector('.changable-el');
  changableHeaderEL.remove();
  const page = event.target.getAttribute('page');

  if (page === "home"){
    pageState.isQueue = false;
    pageState.isWatched = false;
    headerImgEL.classList.remove('library-header_img');
    headerImgEL.classList.add('home-header_img');
  }
  else {
    pageState.isWatched = true;
    headerImgEL.classList.remove('home-header_img');
    headerImgEL.classList.add('library-header_img');
  }
  chageNavElStyle(event);
  renderApp();

  if (pageState.isHome()===false){
    defineLibraryType();
  }
}

function chageNavElStyle(event) {
  [...navElements].forEach(el => el.classList.remove('active-page'));
  event.currentTarget.classList.add('active-page');
};




