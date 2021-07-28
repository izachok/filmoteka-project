import { getGenresByIds } from '../api/genres-library';
import cardMarkup from '../../templates/one-card-markup.hbs';

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
    return 'https://img.icons8.com/dusk/50/000000/video.png';
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
}

export { makeMoviesArrayForRendering, renderGallery };
