import libraryType from './library-type';
import { renderMoviesList } from './renderer';

const refs = {};

function initLibraryHeaderBtns() {
  refs.watchedBtnRef = document.querySelector(`.library-button[data-page="${libraryType.WATCHED}"]`);
  refs.queueBtnRef = document.querySelector(`.library-button[data-page="${libraryType.QUEUE}"]`);
  refs.filmListRef = document.querySelector('.films__list');

  refs.watchedBtnRef?.addEventListener('click', onClickWatchedBtn);
  refs.queueBtnRef?.addEventListener('click', onClickQueueBtn);
}

function onClickWatchedBtn() {
  pageState.isWatched = true;
  pagination.reset();
  renderMoviesList();
}

function onClickQueueBtn() {
  pageState.isQueue = true;
  pagination.reset();
  renderMoviesList();
}

export { initLibraryHeaderBtns, onClickWatchedBtn, onClickQueueBtn };
