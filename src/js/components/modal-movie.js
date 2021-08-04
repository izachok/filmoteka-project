import * as basicLightbox from 'basiclightbox';
import modalWindowMovie from '../../templates/modalWindowMovie';
import similarMovies from '../../templates/similarMovies';
import libraryType from './library-type';
import LibraryBtn from './library-btn';
import { renderMoviesList } from './renderer';
import { getGenresByIds } from '../api/genres-library';
import { getSimilarMovie, getMovieById } from '../api/moviesdb-api';
import { createTrailerModal } from './trailer-modal';

class OpenModal {
  #windowKeyHandler = this.onWindowClick.bind(this);

  constructor(argument) {
    // console.log('>> ar', argument);
    this.posterSimilar = document.querySelector('.poster-similar');
    this.id = argument.id;
    this.genresArray = argument.genre_ids;
    this.movieObj = argument;
    this.instance = basicLightbox.create(modalWindowMovie(this.movieObj), {
      onClose: () => {
        this.onCloseModal();
      },
      onShow: () => {
        this.onShowModal();
      },
    });
  }

  buttonsOnWork(current) {
    const watchBtn = new LibraryBtn({
      element: this.instance.element().querySelector('[data-action="add-to-watched"]'),
      movieObj: current,
      type: libraryType.WATCHED,
    });

    const queueBtn = new LibraryBtn({
      element: this.instance.element().querySelector('[data-action="add-to-queue"]'),
      movieObj: current,
      type: libraryType.QUEUE,
    });

    document.querySelector('.modal__close').addEventListener('click', event => {
      return this.instance.close();
    });

    document.querySelector('.modal').classList.add('active');
    createTrailerModal(current);
  }

  showModal() {
    this.instance.show();
    this.buttonsOnWork(this.movieObj);
    // console.log('id', this.id);
    this.createSimilar(this.id);
  }

  createSimilar(dataMovie) {
    getSimilarMovie(dataMovie).then(data => {
      // console.log(data);
      const container = document.querySelector('.similar');
      container.insertAdjacentHTML('beforeend', similarMovies(data));
      this.work();
    });
  }

  work() {
    const doggo = this.instance.element().querySelectorAll('.similar-item');

    doggo.forEach(el =>
      el.addEventListener('click', event => {
        // console.log(event.target.id);
        getMovieById(event.target.id).then(data => {
          console.log('current movie', data.id);
          this.reloadModal(data);
          this.buttonsOnWork(data);
          this.createSimilar(data.id);
        });
      }),
    );
  }

  reloadModal(some) {
    const modal = this.instance.element().querySelector('.modal');
    const modalWindow = this.instance.element().querySelector('.modal-window');
    // console.log('hey im here', modalWindow);
    modalWindow.remove();
    modal.insertAdjacentHTML('beforeend', modalWindowMovie(some));
  }

  genresForModal() {
    return (document.querySelector('.genre').textContent = getGenresByIds(this.genresArray)
      .flatMap(cat => cat.name)
      .join(', '));
  }

  onShowModal() {
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', this.#windowKeyHandler);
  }

  onCloseModal() {
    document.body.classList.remove('modal-open');
    window.removeEventListener('keydown', this.#windowKeyHandler);
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

export { OpenModal };
