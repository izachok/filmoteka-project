import * as basicLightbox from 'basiclightbox';
import modalWindowMovie from '../../templates/modalWindowMovie';
import libraryType from './library-type';
import LibraryBtn from './library-btn';
import { renderMoviesList } from './renderer';

class OpenModal {
  constructor(argument) {
    this.movieObj = argument;
    this.instance = basicLightbox.create(modalWindowMovie(argument), {
      onClose: this.onCloseModal,
      onShow: this.onShowModal,
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

    // this.onShowModal();

    window.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.instance.close();
      }
    });

    document.querySelector('.modal__close').addEventListener('click', event => {
      return this.instance.close();
    });
  }

  onShowModal() {
    document.body.classList.add('modal-open');
  }

  onCloseModal() {
    document.body.classList.remove('modal-open');
    //rerender movies list if add/remove buttons were clicked
    if (!pageState.isHome && pageState.wasLibraryChanged) {
      renderMoviesList();
    }
  }
}

export { OpenModal };
