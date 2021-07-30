import { getGenresByIds } from '../api/genres-library';
import cardMarkup from '../../templates/one-card-markup.hbs';
import { OpenModal } from './modal-movie';
// import { showModal, onShowModal, onCloseModal, turnOnKeys } from './modal-movie';

const filmList = document.querySelector('.films-list');

const BASE_URL = 'https://image.tmdb.org/t/p/';
const BASE_WIDTH = 'w342';

function arrGenres(array) {
  return array.map(item => item.name);
}

function makeStringGenres(arrStrName) {
  if (!Array.isArray(arrStrName)) return '';
  if (arrStrName.length > 2) {
    return `${arrStrName[0]}, ${arrStrName[1]}, Other |`;
  }
  return arrStrName.join(', ').concat(' |');
}

function makeUrl(partialURL) {
  if (partialURL === null) {
    return 'icon-poster.png';
  }
  return `${BASE_URL}${BASE_WIDTH}${partialURL}`;
}

function makeYear(movie) {
  const arrayKeysMovie = Object.keys(movie);
  if (!arrayKeysMovie.includes('release_date')) {
    return '';
  }
  return movie.release_date.slice(0, 4);
}

function makeMoviesArrayForRendering(data) {
  const arrMovies = data.results;
  const arrayForRendering = arrMovies.map(movie => {
    const newArrayId = getGenresByIds(movie.genre_ids);
    const arrStrName = arrGenres(newArrayId);
    movie.stringGenres = makeStringGenres(arrStrName);
    movie.posterUrl = makeUrl(movie.poster_path);
    movie.releaseYear = makeYear(movie);
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
