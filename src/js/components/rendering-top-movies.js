import { getTrendingMovies } from '../api/moviesdb-api';
import { makeMoviesArrayForRendering, renderGallery } from './rendering-movies';
import { Notify } from 'notiflix';

function renderTopMovies(page = 1) {
  if (pageState.isHome) {
    return getTrendingMovies(page)
      .then(makeMoviesArrayForRendering)
      .then(value => {
        return renderGallery(value);
      })
      .catch(error => Notify.failure(`${error}`));
  }
}

export { renderTopMovies };
