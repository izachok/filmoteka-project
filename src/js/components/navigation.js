import { renderApp } from "./renderer";
import { setIsQueue, setIsWatched } from "./pageState";
import { initLibrary } from "./renderLibrary";

const navElements = document.getElementsByClassName('navEl');

export function initNavigation() {
  
  for (let i = 0; i < navElements.length; i++) {
      let navElement = navElements[i];
      navElement.onclick = changePage;
  }
}

function changePage(event) {
  const headerImgEL = document.querySelector('.header-section');
  const changableHeaderEL = document.querySelector('.changable-el');
  changableHeaderEL.remove();
  const page = event.target.getAttribute('page');

  if (page === "home"){
    setIsQueue(false);
    setIsWatched(false);
    headerImgEL.classList.remove('library-header_img');
    headerImgEL.classList.add('home-header_img');
  }
  else {
    setIsWatched(true);
    headerImgEL.classList.remove('home-header_img');
    headerImgEL.classList.add('library-header_img');
    initLibrary();
  }
  removeClassStyle();
  addClassStyle(event);

  renderApp();
}


function removeClassStyle() {
  const navElsArray = [...navElements];
  navElsArray.forEach(el => el.classList.remove('active-page'))
};

function addClassStyle(event){
  const currentEventNavEl = event.currentTarget;
  currentEventNavEl.classList.add('active-page');
};