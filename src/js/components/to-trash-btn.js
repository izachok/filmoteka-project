import btnToEmpty from './../../templates/clear-library-button.hbs';
import { onClickWatchedBtn, onClickQueueBtn } from './functionality-watched-queue-button';
import * as localBD from './localDB';
import libraryType from './library-type';
import { Confirm } from 'notiflix';
// import Notiflix from 'notiflix';

const pageContainerEl = document.querySelector('.page-container__body');

function renderBtnToClear() {
  const isVisible =
    (pageState.isWatched && localBD.getItemsFromWatched()?.length > 0) ||
    (pageState.isQueue && localBD.getItemsFromQueue()?.length > 0);

  if (isVisible) {
    document.querySelector('.button_clear-library').classList.remove('hidden');
    document.querySelector('.tooltip').classList.remove('hidden');
  } else {
    document.querySelector('.button_clear-library').classList.add('hidden');
    document.querySelector('.tooltip').classList.add('hidden');
  }
}

function initBtnToClear() {
  pageContainerEl.insertAdjacentHTML('beforeend', btnToEmpty());
  const buttonClearLibrary = document.querySelector('.button_clear-library');
  buttonClearLibrary.addEventListener('click', () => {
    Confirm.show(
      'Delete library list', 
      'Are you sure?', 
      'Yes', 
      'No', 
      function () {
        clearLibrary(pageState)
      }, 
      null,
      { titleColor:"#ff6b01", okButtonBackground:"#ff6b01"}
    )
  })
}

function clearLibrary() {
  if (pageState.isWatched) {
    localBD.removeFromLocalStorage(libraryType.WATCHED);
    onClickWatchedBtn();
  }
  if (pageState.isQueue) {
    localBD.removeFromLocalStorage(libraryType.QUEUE);
    onClickQueueBtn();
  }
}

export { renderBtnToClear, initBtnToClear };
