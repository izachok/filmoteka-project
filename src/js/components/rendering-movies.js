import * as moviesDBApi from '../api/moviesdb-api';
// import getGenresByIds from '../api/genres-library';
import genres from '../../data/genres.json';
import cardMrc from '../../templates/one-card-mrc.hbs'
const BASE_URL = 'http://image.tmdb.org/t/p/';
const BASE_WIDTH = 'w500';

// moviesDBApi.getMoviesByQuery('cat', 2).then(console.log);
// moviesDBApi.getMovieById(400).then(console.log);
moviesDBApi.getTrendingMovies().then(makeArrayForRendering).then(renderingGalerry);

const filmList = document.querySelector('.films__list');

const getGenresByIds = function (genreIds) {
  if (!Array.isArray(genreIds)) return [];
  return genres.filter(genre => genreIds.includes(genre.id));
};

function makeArrayForRendering(data) {
    const arrMovies = data.results;
    const arrayForRendering = arrMovies.map(movie => {
        const newArrayId = getGenresByIds(movie.genre_ids);
        const arrStrName = arrGengies(newArrayId);
        movie.stringGenries = makeStringGenries(arrStrName);
        movie.poster_url = makeUrl(movie.poster_path)

        return movie;
    });
    return arrayForRendering;
};
function arrGengies (array) {
    return array.map(item => item.name)
};
function makeStringGenries (arrStrName) {
    if (!Array.isArray(arrStrName)) return '';
    if (arrStrName.length > 2) {
     return `${arrStrName[0]}, ${arrStrName[1]}, Other|`   
    };
    return arrStrName.join(',')
};
function makeUrl(partialURL) {
    return `${BASE_URL}${BASE_WIDTH}${partialURL}`
}

function renderingGalerry(arrayForRendering) {
    const galleryMrc = cardMrc(arrayForRendering);
    filmList.insertAdjacentHTML('beforeend', galleryMrc)
};
