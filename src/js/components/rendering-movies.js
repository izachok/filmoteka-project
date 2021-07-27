import { getGenresByIds } from '../api/genres-library';
import cardMarkup from '../../templates/one-card-markup.hbs';

const BASE_URL = 'http://image.tmdb.org/t/p/';
const BASE_WIDTH = 'w342';

function arrGenres(array) {
  return array.map(item => item.name);
}

function makeStringGenres(arrStrName) {
  if (!Array.isArray(arrStrName)) return '';
  if (arrStrName.length > 2) {
    return `${arrStrName[0]}, ${arrStrName[1]}, Other |`;
  }
  return arrStrName.join(',').concat(' |');
}

function makeUrl(partialURL) {
  return `${BASE_URL}${BASE_WIDTH}${partialURL}`;
}

function makeYear(dateStr) {
  return dateStr.slice(0, 4);
}

function makeMoviesArrayForRendering(data) {
  const arrMovies = data.results;
  const arrayForRendering = arrMovies.map(movie => {
    const newArrayId = getGenresByIds(movie.genre_ids);
    const arrStrName = arrGenres(newArrayId);
    movie.stringGenres = makeStringGenres(arrStrName);
    movie.posterUrl = makeUrl(movie.poster_path);
    movie.releaseYear = makeYear(movie.release_date);
    return movie;
  });
  return arrayForRendering;
}

function renderGallery(arrayForRendering, element) {
  const galleryMarkup = cardMarkup(arrayForRendering);
  element.innerHTML = galleryMarkup;
}

export { makeMoviesArrayForRendering, renderGallery };
