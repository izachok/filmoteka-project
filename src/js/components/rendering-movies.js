import * as moviesDBApi from '../api/moviesdb-api';
// import getGenresByIds from '../api/genres-library';
import genres from '../../data/genres.json';

moviesDBApi.getMoviesByQuery('cat', 2).then(console.log);
moviesDBApi.getMovieById(400).then(console.log);

moviesDBApi.getTrendingMovies().then(makeArrayForRendering);

const getGenresByIds = function (genreIds) {
  if (!Array.isArray(genreIds)) return [];
  return genres.filter(genre => genreIds.includes(genre.id));
};

function makeArrayForRendering(data) {
    const arrMovies = data.results;
    // const id = getGenresByIds(arrMovies[1].genre_ids);
    const arrayForRendering = arrMovies.map(movie => {
        const newArrayId = getGenresByIds(movie.genre_ids);
        const arrStrName = arrGengies(newArrayId);
        movie.stringGenries = makeStringGenries(arrStrName);
        return movie;
    })
    return console.log(arrayForRendering);
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
}