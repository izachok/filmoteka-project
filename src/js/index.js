import 'basiclightbox/dist/basicLightbox.min.css';
import '../sass/main.scss';
import * as footerModal from './components/footer-modal';

//example of using api functions
// import * as moviesDBApi from './api/moviesdb-api';
// moviesDBApi.getTrendingMovies().then(console.log);
// moviesDBApi.getMoviesByQuery('cat', 2).then(console.log);
// moviesDBApi.getMovieById(400).then(console.log);


import { makeMoviesArrayForRendering, renderGallery } from './components/rendering-movies';

footerModal.createFooterModal();

// example of using makeMoviesArrayForRendering, renderGallery functions
// moviesDBApi.getTrendingMovies().then(makeMoviesArrayForRendering).then(arr => renderGallery(arr, filmList)); 