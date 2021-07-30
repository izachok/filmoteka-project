import { getGenresByIds } from '../api/genres-library';
import cardMarkup from '../../templates/one-card-markup.hbs';
import { OpenModal } from './modal-movie';
// import { showModal, onShowModal, onCloseModal, turnOnKeys } from './modal-movie';

const filmList = document.querySelector('.films-list');

const BASE_URL = 'https://image.tmdb.org/t/p/';
const BASE_WIDTH = 'w500';

function arrGenres(array) {
  return array.map(item => item.name);
}

function makeStringGenres(arrStrName) {
  if (!Array.isArray(arrStrName)) return '';
  if (arrStrName.length > 2) {
    return `${arrStrName[0]}, ${arrStrName[1]}`;
  }
  return arrStrName.join(', ');
}

function makeYear(movie) {
  if (movie.release_date) {
    return movie.release_date.slice(0, 4);
  }
  return '';
}

function makeStringDescription(movie) {
  const arrStrName = arrGenres(getGenresByIds(movie.genre_ids));
  const stringGenres = makeStringGenres(arrStrName);
  const yearRelease = makeYear(movie);

  if (yearRelease === '' || stringGenres === '') {
    return `${stringGenres}${yearRelease}`;
  } else {
    return `${stringGenres} | ${yearRelease}`;
  }
}

function makeUrl(partialURL) {
  if (partialURL === null) {
    return 'icon-poster.png';
  }
  return `${BASE_URL}${BASE_WIDTH}${partialURL}`;
}

function makeMoviesArrayForRendering(data) {
  const arrMovies = data.results;
  const arrayForRendering = arrMovies.map(movie => {
    movie.stringDescription = makeStringDescription(movie);
    movie.posterUrl = makeUrl(movie.poster_path);
    return movie;
  });
  return arrayForRendering;
}

function renderGallery(arrayForRendering, element) {
  const galleryMarkup = cardMarkup(arrayForRendering);
  element.innerHTML = galleryMarkup;

  bindMovieObjToCard(arrayForRendering);
}

function bindMovieObjToCard(movieObjs) {
  // const filmList = document.querySelector('.films__list');
  const cards = document.querySelectorAll('.films__list-item');
  cards.forEach((card, index) => {
    card.addEventListener('click', event => {
      const openModal = new OpenModal(movieObjs[index]);
      openModal.showModal();
      openModal.onShowModal();
      openModal.onCloseModal();
      // showModal(movieObjs[index]);
    });
  });
}

//-----------------temp for testing library buttons-----------
// import * as basicLightbox from 'basiclightbox';
// import libraryType from './library-type';
// import LibraryBtn from './library-btn';

// function showMovieModal(movieObj) {
//   const modalInstance =
//     basicLightbox.create(`<div class="footer-modal modal"><h1>${movieObj.title}</h1>
// 	<p><button type="button" data-action="add-to-watched">Add</button>
//   <button type="button" data-action="add-to-queue">Add</button>
//   </p></div>`);
//   modalInstance.show();

//   const watchBtn = new LibraryBtn({
//     element: modalInstance.element().querySelector('[data-action="add-to-watched"]'),
//     movieObj,
//     type: libraryType.WATCHED,
//   });

//   const queueBtn = new LibraryBtn({
//     element: modalInstance.element().querySelector('[data-action="add-to-queue"]'),
//     movieObj,
//     type: libraryType.QUEUE,
//   });
// }

export { makeMoviesArrayForRendering, renderGallery };
