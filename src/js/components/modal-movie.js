import * as basicLightbox from 'basiclightbox';
import modalWindowMovie from '../../templates/modalWindowMovie';
import similarMovies from '../../templates/similarMovies';
import libraryType from './library-type';
import LibraryBtn from './library-btn';
import { renderMoviesList } from './renderer';
import { getSimilarMovie, getMovieById } from '../api/moviesdb-api';
import { createTrailerModal } from './trailer-modal';
import { prepareMovieForRendering } from './rendering-movies';

class OpenModal {
  #windowKeyHandler = this.onWindowClick.bind(this);

  constructor(argument) {
    this.posterSimilar = document.querySelector('.poster-similar');
    this.id = argument.id;
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
    this.createSimilar(this.id);
  }

  createSimilar(dataMovie) {
    getSimilarMovie(dataMovie)
      .then(response => {
        return response.results.slice(0, 6);
      })
      .then(data => {
        const container = document.querySelector('.similar');
        container.insertAdjacentHTML('beforeend', similarMovies(data));
        this.work();
      })
      .catch(() => {
        document.querySelector('.s-title').classList.add('hidden');
      });
  }

  work() {
    this.instance
      .element()
      .querySelectorAll('.similar-item')
      .forEach(el =>
        el.addEventListener('click', event => {
          getMovieById(event.target.id).then(data => {
            this.reloadModal(data);
            this.buttonsOnWork(data);
            this.createSimilar(data.id);
          });
        }),
      );
  }

  reloadModal(movie) {
    const modal = this.instance.element().querySelector('.modal');
    const modalWindow = this.instance.element().querySelector('.modal-window');
    movie.genre_ids = movie.genres.map(item => item.id);
    movie = prepareMovieForRendering(movie);
    modalWindow.remove();
    modal.insertAdjacentHTML('beforeend', modalWindowMovie(movie));
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
