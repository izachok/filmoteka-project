import libraryType from './library-type';
import * as localDB from './localDB';

export default class LibraryBtn {
  constructor({ element, movieObj, type }) {
    this.ref = element;
    this.movieObj = movieObj;
    this.type = type;
    this.setStatus();
    this.bindEvent();
  }

  isInLibrary() {
    switch (this.type) {
      case libraryType.WATCHED:
        return localDB.isInWatched(this.movieObj);
        break;
      case libraryType.QUEUE:
        return localDB.isInQueue(this.movieObj);
      default:
        break;
    }
  }

  setStatus() {
    if (this.isInLibrary()) {
      this.ref.textContent = `Remove from ${this.type}`;
    } else {
      this.ref.textContent = `Add to ${this.type}`;
    }
  }

  bindEvent() {
    this.ref.addEventListener('click', this.onClick.bind(this));
  }

  onClick() {
    switch (this.type) {
      case libraryType.WATCHED:
        if (this.isInLibrary()) {
          localDB.removeFromWatched(this.movieObj);
        } else {
          localDB.addItemToWatched(this.movieObj);
        }
        break;
      case libraryType.QUEUE:
        if (this.isInLibrary()) {
          localDB.removeFromQueue(this.movieObj);
        } else {
          localDB.addItemToQueue(this.movieObj);
        }
      default:
        break;
    }
    pageState.wasLibraryChanged = true;
    this.setStatus();
  }
}
