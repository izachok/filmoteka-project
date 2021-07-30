export class PageState {
  #isWatched = false;
  #isQueue = false;
  #query = '';
  #wasLibraryChanged = false;
  constructor() {}

  get query() {
    return this.#query;
  }
  set query(value) {
    this.#query = value;
  }

  get isWatched() {
    return this.#isWatched;
  }
  set isWatched(value) {
    this.#isWatched = value;
    this.#isQueue = !value;
  }

  get isQueue() {
    return this.#isQueue;
  }
  set isQueue(value) {
    this.#isWatched = !value;
    this.#isQueue = value;
  }

  get isHome() {
    return !this.#isQueue && !this.#isWatched;
  }
  set isHome(value) {
    if (value) {
      this.#isWatched = !value;
      this.#isQueue = !value;
    } else {
      //set by default watched library page
      this.#isWatched = !value;
    }
  }

  get wasLibraryChanged() {
    return this.#wasLibraryChanged;
  }

  set wasLibraryChanged(value) {
    this.#wasLibraryChanged = value;
  }
}
