import { makeMoviesArrayForRendering, renderGallery } from './rendering-movies.js';
import * as localDB from './localDB';

// to do change or remove querySelector for buttons if they are in a different place
const refs = {
  watchedBtnRef: document.querySelector('.watched'),
  queueBtnRef: document.querySelector('.queue'),
  filmListRef: document.querySelector('.films__list'),
};

// refs.watchedBtnRef.addEventListener('click', onClickWatchedBtn);
// refs.queueBtnRef.addEventListener('click', onClickQueueBtn);
// to do remove event listener if it will be in a different location

function onClickWatchedBtn() {
  if (localDB.getItemsFromWatched() === null || localDB.getItemsFromWatched().length === 0) {
    const htmlString = '<span class="list-is-empty__text">This list is empty</span>';
    return (refs.filmListRef.innerHTML = htmlString);
  } else {
    return renderGallery(localDB.getItemsFromWatched(), refs.filmListRef);
  }
}

function onClickQueueBtn() {
  if (localDB.getItemsFromQueue() === null || localDB.getItemsFromQueue().length === 0) {
    const htmlString = '<div class="list-is-empty__text">This list is empty</div>';
    return (refs.filmListRef.innerHTML = htmlString);
  } else {
    return renderGallery(localDB.getItemsFromQueue(), refs.filmListRef);
  }
}

export { onClickWatchedBtn, onClickQueueBtn };
