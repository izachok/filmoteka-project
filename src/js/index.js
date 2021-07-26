import '../sass/main.scss';
import * as basicLightbox from 'basiclightbox';
import modalWindowMovie from '../templates/modalWindowMovie';

function showModal() {
  const openModalMovie = basicLightbox.create(modalWindowMovie());
  console.log('im here');
  return openModalMovie.show();
}

showModal();

//example of using api functions
// import * as moviesDBApi from './api/moviesdb-api';
// moviesDBApi.getTrendingMovies().then(console.log);
// moviesDBApi.getMoviesByQuery('cat', 2).then(console.log);
// moviesDBApi.getMovieById(400).then(console.log);
