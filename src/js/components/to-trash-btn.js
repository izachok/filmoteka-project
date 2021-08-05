import btnToEmpty from './../../templates/clear-library-button.hbs';
import {onClickWatchedBtn, onClickQueueBtn} from './functionality-watched-queue-button';


const pageContainerEl = document.querySelector('.page-container__body');

function renderBtnToClear(){
  if (localStorage.length > 1) {
    pageContainerEl.insertAdjacentHTML('beforeend', btnToEmpty({ ...pageState}));
    const buttonClearLibrary = document.querySelector('.button_clear-library');
    buttonClearLibrary.addEventListener('click', () => {
      clearLibrary(pageState)
    });
  }
};

function removeBtnToClear(){
  const buttonClearLibrary = document.querySelector('.button-delete_container');
  if(buttonClearLibrary) {
    buttonClearLibrary.remove()
  };
}

function clearLibrary() {
  if (pageState.isWatched){
    window.localStorage.removeItem('watched');
    onClickWatchedBtn();
  }
  if (pageState.isQueue) {
    window.localStorage.removeItem('queue');
    onClickQueueBtn();
  }
}

export {removeBtnToClear, renderBtnToClear};