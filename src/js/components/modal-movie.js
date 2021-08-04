import * as basicLightbox from 'basiclightbox';
import modalWindowMovie from '../../templates/modalWindowMovie';
import libraryType from './library-type';
import LibraryBtn from './library-btn';
import { renderMoviesList } from './renderer';
import { getGenresByIds } from '../api/genres-library';
import { createTrailerModal } from './trailer-modal';

function genresForModal(array) {
  return (document.querySelector('.genre').textContent = getGenresByIds(array)
    .flatMap(cat => cat.name)
    .join(', '));
}

class OpenModal {
  #windowKeyHandler = this.onWindowClick.bind(this);

  constructor(argument) {
    this.movieObj = argument;
    this.instance = basicLightbox.create(modalWindowMovie(argument), {
      onClose: () => {
        this.onCloseModal();
      },
      onShow: () => {
        this.onShowModal();
      },
    });
  }

  showModal() {
    this.instance.show();
    const watchBtn = new LibraryBtn({
      element: this.instance.element().querySelector('[data-action="add-to-watched"]'),
      movieObj: this.movieObj,
      type: libraryType.WATCHED,
    });

    const queueBtn = new LibraryBtn({
      element: this.instance.element().querySelector('[data-action="add-to-queue"]'),
      movieObj: this.movieObj,
      type: libraryType.QUEUE,
    });

    document.querySelector('.modal__close').addEventListener('click', event => {
      return this.instance.close();
    });

    document.querySelector('.modal').classList.add('active');
    createTrailerModal(this.movieObj);
  }

  onShowModal() {
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', this.#windowKeyHandler);
  }

  onCloseModal() {
    document.body.classList.remove('modal-open');
    window.removeEventListener('keydown', this.#windowKeyHandler);
    //rerender movies list if add/remove buttons were clicked
    if (!pageState.isHome && pageState.wasLibraryChanged) {
      renderMoviesList();
    }
  }

  onWindowClick(event) {
    if (event.code === 'Escape' && document.querySelector('.modal').className.includes('active')) {
      this.instance.close();
    }
  }
}

export { OpenModal, genresForModal };
