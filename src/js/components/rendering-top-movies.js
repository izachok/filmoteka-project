import { getTrendingMovies } from '../api/moviesdb-api';
import { makeMoviesArrayForRendering, renderGallery } from './rendering-movies';

function renderTopMovies(page = 1) {
  if (pageState.isHome) {
    return getTrendingMovies(page)
      .then(makeMoviesArrayForRendering)
      .then(value => {
        return renderGallery(value);
      });
  }
}

export { renderTopMovies };
