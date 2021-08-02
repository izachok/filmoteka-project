import LibraryBtn from './library-btn';
import libraryType from './library-type';

function oneCardOverlayBtn(movieObj) {
  const watchBtn = new LibraryBtn({
    element: document.querySelector('[data-action="add-to-watched_one-card"]'),
    movieObj: movieObj,
    type: libraryType.WATCHED,
  });

  const queueBtn = new LibraryBtn({
    element: document.querySelector('[data-action="add-to-queue_one-card"]'),
    movieObj: movieObj,
    type: libraryType.QUEUE,
  });
}
export { oneCardOverlayBtn };
