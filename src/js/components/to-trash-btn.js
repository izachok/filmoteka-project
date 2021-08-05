import btnToEmpty from './../../templates/clear-library-button.hbs';
import { onClickWatchedBtn, onClickQueueBtn } from './functionality-watched-queue-button';
import * as localBD from './localDB';
import libraryType from './library-type';

const pageContainerEl = document.querySelector('.page-container__body');

function renderBtnToClear() {
  const isVisible =
    (pageState.isWatched && localBD.getItemsFromWatched()?.length > 0) ||
    (pageState.isQueue && localBD.getItemsFromQueue()?.length > 0);

  if (isVisible) {
    document.querySelector('.button_clear-library').classList.remove('hidden');
  } else {
    document.querySelector('.button_clear-library').classList.add('hidden');
  }
}

function initBtnToClear() {
  pageContainerEl.insertAdjacentHTML('beforeend', btnToEmpty());
  const buttonClearLibrary = document.querySelector('.button_clear-library');
  buttonClearLibrary.addEventListener('click', () => {
    clearLibrary(pageState);
  });
}

// function removeBtnToClear() {
//   const buttonClearLibrary = document.querySelector('.button-delete_container');
//   if (buttonClearLibrary) {
//     buttonClearLibrary.remove();
//   }
// }

function clearLibrary() {
  if (pageState.isWatched) {
    localBD.removeFromLocalStorage(libraryType.WATCHED);
    // window.localStorage.removeItem('watched');
    onClickWatchedBtn();
  }
  if (pageState.isQueue) {
    localBD.removeFromLocalStorage(libraryType.QUEUE);
    // window.localStorage.removeItem('queue');
    onClickQueueBtn();
  }
}

export { renderBtnToClear, initBtnToClear };
