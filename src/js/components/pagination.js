import Pagination from 'tui-pagination';
import { renderTopMovies } from './rendering-top-movies';
import { RenderSearchResults } from './search';
import { renderMoviesList } from './renderer';

const ITEMS_PER_PAGE_HOME = 20;
let ITEMS_PER_PAGE_LOCALDB = 9;

const refs = {
  paginationContainer: null,
  paginationDesktopPageSize: 9,
  paginationTabletPageSize: 8,
  paginationMobilePageSize:4,
};

export function createPagination() {
  const options = {
    itemsPerPage: ITEMS_PER_PAGE_HOME,
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
    renderMoviesList(event.page);
  }
  if (pageState.query) {
    RenderSearchResults(event.page);
  } else {
    renderTopMovies(event.page);
  }
  scrollToNew();
};

const scrollToNew = function () {
  document.querySelector('.films__list').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

const setPaginationVisibility = function (data) {
  if (data.total_results > ITEMS_PER_PAGE_HOME) {
    refs.paginationContainer.classList.remove('visually-hidden');
  } else {
    refs.paginationContainer.classList.add('visually-hidden');
  }
};

const setPaginationVisibilityLocalDB = function (totalCount) {
  if (pageState.isHome) {
    return;
  }
  if (totalCount > ITEMS_PER_PAGE_LOCALDB) {
    refs.paginationContainer.classList.remove('visually-hidden');
  } else {
    refs.paginationContainer.classList.add('visually-hidden');
  }
};

const setPaginationPerPage = function () {
  if (pageState.isHome) {
    pagination.setItemsPerPage(ITEMS_PER_PAGE_HOME);
  } else {
    setItemsPerPageLocalStorage()
    pagination.setItemsPerPage(ITEMS_PER_PAGE_LOCALDB);
  }
};

const bindPagination = function () {
  refs.paginationContainer = document.querySelector('.tui-pagination');
  pagination.on('beforeMove', onCurrentPageClick);
};

function setItemsPerPageLocalStorage() {
 
  if (window.innerWidth < 768) {ITEMS_PER_PAGE_LOCALDB = refs.paginationMobilePageSize}
  else if (window.innerWidth >= 768 && window.innerWidth < 1024) {ITEMS_PER_PAGE_LOCALDB = refs.paginationTabletPageSize}
  else if (window.innerWidth >= 1024) {ITEMS_PER_PAGE_LOCALDB = refs.paginationDesktopPageSize};
  return ITEMS_PER_PAGE_LOCALDB;
};

export {
  onCurrentPageClick,
  setPaginationVisibility,
  setPaginationVisibilityLocalDB,
  setPaginationPerPage,
  ITEMS_PER_PAGE_LOCALDB,
};
