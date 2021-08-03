import * as basicLightbox from 'basiclightbox';
import modalWindowTrailer from '../../templates/modalWindowTrailer';
import { getTrailerById } from '../api/moviesdb-api';

let modalTrailer = null;

const createTrailerModal = async function (movie) {
  const trailerObj = await getTrailerById(movie.id);
  modalTrailer = basicLightbox.create(modalWindowTrailer(trailerObj.results[0]), {
    onShow: onModalTrailerShow,
  });
  createEvents();
};

function createEvents() {
  document.querySelector('.movie__button-trailer').addEventListener('click', () => {
    modalTrailer.show();
    document.querySelector('[data-action="modal-close-trailer"]').addEventListener('click', () => {
      modalTrailer.close();
    });
  });
}

function onModalTrailerShow() {
  window.addEventListener('keydown', onEscKeydown);
}

function onEscKeydown(e) {
  if (e.code === 'Escape') {
    modalTrailer.close();
  }
}

export { createTrailerModal };
