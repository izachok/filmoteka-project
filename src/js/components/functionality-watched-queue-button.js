import libraryType from './library-type';
import { renderMoviesList } from './renderer';
import { renderBtnToClear } from './to-trash-btn';
const refs = {};

function initLibraryHeaderBtns() {
  refs.watchedBtnRef = document.querySelector(
    `.library-button[data-page="${libraryType.WATCHED}"]`,
  );
  refs.queueBtnRef = document.querySelector(`.library-button[data-page="${libraryType.QUEUE}"]`);
  refs.filmListRef = document.querySelector('.films__list');

  refs.watchedBtnRef?.addEventListener('click', onClickWatchedBtn);
  refs.queueBtnRef?.addEventListener('click', onClickQueueBtn);
}

function onClickWatchedBtn() {
  pageState.isWatched = true;
  renderPage();
}

function onClickQueueBtn() {
  pageState.isQueue = true;
  renderPage();
}

function renderPage() {
  pagination.reset();
  renderMoviesList();
  renderBtnToClear();
}

export { initLibraryHeaderBtns, onClickWatchedBtn, onClickQueueBtn };
