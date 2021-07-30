import libraryType from './library-type';

export function defineLibraryType() {
  const libraryBtnElements = [...document.getElementsByClassName('library-button')];
  libraryBtnElements.map(el => (el.onclick = changeLibraryState));
}

function changeLibraryState(event) {
  [...document.getElementsByClassName('library-button')].map(el =>
    el.classList.remove('library-button_active'),
  );
  const page = event.target.getAttribute('page');

  if (page === libraryType.WATCHED) {
    pageState.isWatched = true;
  } else if (page === libraryType.QUEUE) {
    pageState.isQueue = true;
  }

  event.currentTarget.classList.add('library-button_active');
}
