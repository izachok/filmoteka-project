import libraryType from "./library-type";
import btnToEmpty from './../../templates/delete-button.hbs';
import { changePage } from './navigation';


const pageContainerEl = document.querySelector('.page-container__body');

function renderBtnToClear(){
  console.log(localStorage);
  if (localStorage.length > 0) {
    pageContainerEl.insertAdjacentHTML('beforeend', btnToEmpty());
    // { ...pageState}  передать в btnToEmpty чтоб генерировать разные шаблоны
    const buttonClearLibrary = document.querySelector('.button_clear-library');
    buttonClearLibrary.addEventListener('click', () => {
      clearLibrary()});
      // былобы хорошо в  clearLibrary передать состоянии страницы и удалить нужную библиотеку
  }
};

function clearLibrary() {
  window.localStorage.clear();
  changePage('library');
}

function removeBtnToClear(){
  const buttonClearLibrary = document.querySelector('.button-delete_container');
  if(buttonClearLibrary){
    buttonClearLibrary.remove()
  };
}

export {removeBtnToClear, renderBtnToClear};