import libraryType from "./library-type";
import btnToEmpty from './../../templates/delete-button.hbs';


const pageContainerEl = document.querySelector('.page-container__body');

export function renderBtnToClear(pageState) {
  pageContainerEl.insertAdjacentHTML('beforeend', btnToEmpty({ ...pageState}));
  const buttonClearLibrary = document.querySelector('.button_clear-library');
  buttonClearLibrary.addEventListener('click', ()=>{
    clearLibrary()
  });
};


function clearLibrary() {
  window.localStorage.clear();
}