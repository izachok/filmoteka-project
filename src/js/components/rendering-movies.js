import { getGenresByIds } from '../api/genres-library';
import cardMarkup from '../../templates/one-card-markup.hbs';
import { OpenModal } from './modal-movie';

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
    const arrStrName = arrGenres(getGenresByIds(movie.genre_ids));
    movie.stringGenres = makeStringGenres(arrStrName);
    return movie;
  });
  return arrayForRendering;
}

function renderGallery(arrayForRendering) {
  const galleryMarkup = cardMarkup(arrayForRendering);
  document.querySelector('.films__list').innerHTML = galleryMarkup;
  showsRating();
  bindMovieObjToCard(arrayForRendering);
}

function showsRating() {
  if (!pageState.isHome) {
    const ratingMarkup = document.querySelectorAll('.one-card__average');
    [...ratingMarkup].map(element => element.classList.remove('visually-hidden'));
  }
}

function bindMovieObjToCard(movieObjs) {
  const cards = document.querySelectorAll('.films__list-item');
  cards.forEach((card, index) => {
    card.addEventListener('click', event => {
      const openModal = new OpenModal(movieObjs[index]);
      openModal.showModal();
      // //todo move to OpenModal class and delete here
      // openModal.onShowModal();
      // openModal.onCloseModal();
    });
  });
}

export { makeMoviesArrayForRendering, renderGallery };
