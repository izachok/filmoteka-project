import Pagination from 'tui-pagination';
import { getTrendingMovies, getMoviesByQuery, getMovieById } from '../api/moviesdb-api';
import { renderTopMovies } from './rendering-top-movies';
import { Notify } from 'notiflix';
import { PageState } from './page-state';
import { RenderSearchResults } from './search';

const refs = {
  paginationContainer: null,
};

export function createPagination() {
  const options = {
    totalItems: 1000,
    itemsPerPage: 20,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
  };

  const container = document.getElementById('tui-pagination-container');
  window.pagination = new Pagination(container, options);
  //   pagination.setItemsPerPage(20);
  bindPagination();
}

const onCurrentPageClick = async function (event) {
  if (pageState.query) {
    RenderSearchResults(event.page);
  } else {
    renderTopMovies(event.page);
  }
};

export { onCurrentPageClick };

export const bindPagination = function () {
  refs.paginationContainer = document.querySelector('.tui-pagination');
  pagination.on('beforeMove', onCurrentPageClick);
};
