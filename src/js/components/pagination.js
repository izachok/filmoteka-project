import Pagination from 'tui-pagination';
import { renderTopMovies } from './rendering-top-movies';
import { RenderSearchResults } from './search';
import { renderMoviesList } from './renderer';

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
    usageStatistics: false,
  };

  const container = document.getElementById('tui-pagination-container');
  window.pagination = new Pagination(container, options);
  //   pagination.setItemsPerPage(20);
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
  if (data.total_results > 20) {
    refs.paginationContainer.classList.remove('visually-hidden');
  } else {
    refs.paginationContainer.classList.add('visually-hidden');
  }
};

const hidePaginationLocalStorage = function (array) {
  if (pageState.isHome) {
    return;
  } else {
    if (array.length >= 19) {
      refs.paginationContainer.classList.remove('visually-hidden');
    } else {
      refs.paginationContainer.classList.add('visually-hidden');
    }
  }
};

export const bindPagination = function () {
  refs.paginationContainer = document.querySelector('.tui-pagination');
  pagination.on('beforeMove', onCurrentPageClick);
};

export { onCurrentPageClick, hidePagination, hidePaginationLocalStorage };
