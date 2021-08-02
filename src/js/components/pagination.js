import Pagination from 'tui-pagination';
import { renderTopMovies } from './rendering-top-movies';
import { RenderSearchResults } from './search';
import { renderMoviesList } from './renderer';

const ITEMS_PER_PAGE = 20;

const refs = {
  paginationContainer: null,
};

export function createPagination() {
  const options = {
    itemsPerPage: ITEMS_PER_PAGE,
    visiblePages: 5,
    page: 1,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    usageStatistics: false,
  };

  const container = document.getElementById('tui-pagination-container');
  window.pagination = new Pagination(container, options);
  bindPagination();
}

const onCurrentPageClick = async function (event) {
  if (pageState.isWatched || pageState.isQueue) {
    renderMoviesList();
  }
  if (pageState.query) {
    RenderSearchResults(event.page);
  } else {
    renderTopMovies(event.page);
  }
};

const hidePagination = function (data) {
  if (data.total_results > ITEMS_PER_PAGE) {
    refs.paginationContainer.classList.remove('visually-hidden');
  } else {
    refs.paginationContainer.classList.add('visually-hidden');
  }
};

const hidePaginationLocalStorage = function (array) {
  refs.paginationContainer.classList.add('visually-hidden');
  // if (pageState.isHome) {
  //   return;
  // }
  // if (array.length > ITEMS_PER_PAGE) {
  //   refs.paginationContainer.classList.remove('visually-hidden');
  // } else {
  //   refs.paginationContainer.classList.add('visually-hidden');
  // }
};

export const bindPagination = function () {
  refs.paginationContainer = document.querySelector('.tui-pagination');
  pagination.on('beforeMove', onCurrentPageClick);
};

export { onCurrentPageClick, hidePagination, hidePaginationLocalStorage };
