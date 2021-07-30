import { pageState } from "./pageState";

export function defineLibraryType(){
  const libraryBtnElements = [...document.getElementsByClassName('library-button')];
  libraryBtnElements.map(el => el.onclick=changeLibraryState)
}

function changeLibraryState(event){
  [...document.getElementsByClassName('library-button')].map(el => el.classList.remove('library-button_active'));
  const page = event.target.getAttribute('page');

  if (page === "watched"){
    pageState.isWatched = true;
    pageState.isQueue = false;
   
  }
  else if (page === "queue"){
    pageState.isWatched = false;
    pageState.isQueue = true;
  }

  event.currentTarget.classList.add('library-button_active');
}
