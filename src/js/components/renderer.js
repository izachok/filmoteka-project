import { renderGallery } from './rendering-movies.js';
import * as localDB from './localDB';
import { initLibraryHeaderBtns } from './functionality-watched-queue-button';
import header from './../../templates/header.hbs';
import { renderTopMovies } from './rendering-top-movies';
import { initSearch } from './search';
import { initNavigation } from './navigation';
import {
  setPaginationVisibilityLocalDB,
  setPaginationPerPage,
  itemsPerPageLocalDB,
} from './pagination';

const emptyPageMessage = '<span class="list-is-empty__text">This list is empty</span>';

function renderApp() {
  setPaginationPerPage();
  pagination.reset();
  renderHeader();
  renderMoviesList();

  // bindPagination();
}

function renderHeader() {
  const headerEL = document.querySelector('.page-header');
  headerEL.insertAdjacentHTML('beforeend', header({ ...pageState, isHome: pageState.isHome }));

  initLibraryHeaderBtns();
  initNavigation();
  initSearch();
}

function renderMoviesList(page = 1) {
  pageState.query = '';
  if (pageState.isHome) {
    //show trending movies
    renderTopMovies();
    // }
  } else if (pageState.isWatched) {
    //show watched library
    renderWatched(page);
  } else {
    //show queue library
    renderQueue(page);
  }
  //page was rerendered so wasLibraryChanged must be reseted
  pageState.wasLibraryChanged = false;
}

function renderWatched(page = 1) {
  if (localDB.getItemsFromWatched() === null || localDB.getItemsFromWatched().length === 0) {
    document.querySelector('.films__list').innerHTML = emptyPageMessage;
    document.querySelector('.tui-pagination').classList.add('visually-hidden');
  } else {
    if (page === 1) {
      pagination.reset(localDB.getItemsFromWatched().length);
      setPaginationVisibilityLocalDB(localDB.getItemsFromWatched().length);
    }

    renderGallery(localDB.getItemsFromWatched(page, itemsPerPageLocalDB));
  }
}

function renderQueue(page = 1) {
  if (localDB.getItemsFromQueue() === null || localDB.getItemsFromQueue().length === 0) {
    document.querySelector('.films__list').innerHTML = emptyPageMessage;
    document.querySelector('.tui-pagination').classList.add('visually-hidden');
  } else {
    if (page === 1) {
      pagination.reset(localDB.getItemsFromQueue().length);
      setPaginationVisibilityLocalDB(localDB.getItemsFromQueue().length);
    }

    renderGallery(localDB.getItemsFromQueue(page, itemsPerPageLocalDB));
  }
}

export { renderApp, renderMoviesList };
