
import * as moviesDBApi from '../api/moviesdb-api'; //todo: delete after checking
import { getGenresByIds } from '../api/genres-library';
import cardMrc from '../../templates/one-card-mrc.hbs';

const BASE_URL = 'http://image.tmdb.org/t/p/';
const BASE_WIDTH = 'w342';

moviesDBApi.getTrendingMovies().then(makeArrayToRendering).then(arr => renderingGalerry(arr, filmList)); //todo: delete after checking

const filmList = document.querySelector('.films__list'); //todo: delete after checking

function arrGengies (array) {
    return array.map(item => item.name)
};

function makeStringGenries (arrStrName) {
    if (!Array.isArray(arrStrName)) return '';
    if (arrStrName.length > 2) {
     return `${arrStrName[0]}, ${arrStrName[1]}, Other |`   
    };
    return arrStrName.join(',').concat(' |')
};

function makeUrl(partialURL) {
    return `${BASE_URL}${BASE_WIDTH}${partialURL}`
};

function makeYear(dateStr) {
    return dateStr.slice(0, 4)
};

function makeArrayToRendering(data) {
    const arrMovies = data.results;
    const arrayToRendering = arrMovies.map(movie => {
        const newArrayId = getGenresByIds(movie.genre_ids);
        const arrStrName = arrGengies(newArrayId);
        movie.stringGenries = makeStringGenries(arrStrName);
        movie.poster_url = makeUrl(movie.poster_path);
        movie.release_year = makeYear(movie.release_date);
        return movie;
    });
    return arrayToRendering;
};

function renderingGalerry(arrayToRendering, element) {
    const galleryMrc = cardMrc(arrayToRendering);
    element.insertAdjacentHTML('beforeend', galleryMrc)
};

export { makeArrayToRendering, renderingGalerry }