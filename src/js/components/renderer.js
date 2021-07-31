import { renderGallery } from './rendering-movies.js';
import * as localDB from './localDB';
import { initLibraryHeaderBtns } from './functionality-watched-queue-button';
import header from './../../templates/header.hbs';
import { renderTopMovies } from './rendering-top-movies';
import { initSearch } from './search';
import { initNavigation } from './navigation';
import { bindPagination, createPagination } from './pagination';

const emptyPageMessage = '<span class="list-is-empty__text">This list is empty</span>';

function renderApp() {
  renderHeader();
  renderMoviesList();
  // bindPagination();
  createPagination();
}

function renderHeader() {
  // window.onload = document.querySelector('button[page="home"]').className('active-page');
  const headerEL = document.querySelector('.page-header');
  headerEL.insertAdjacentHTML('beforeend', header({ ...pageState, isHome: pageState.isHome }));

  initLibraryHeaderBtns();
  initNavigation();
  initSearch();
}

function renderMoviesList() {
  if (pageState.isHome) {
    //show trending movies
    renderTopMovies();
    // }
  } else if (pageState.isWatched) {
    //show watched library
    renderWatched();
  } else {
    //show queue library
    renderQueue();
  }
  //page was rerendered so wasLibraryChanged must be reseted
  pageState.wasLibraryChanged = false;
}

function renderWatched() {
  if (localDB.getItemsFromWatched() === null || localDB.getItemsFromWatched().length === 0) {
    document.querySelector('.films__list').innerHTML = emptyPageMessage;
  } else {
    renderGallery(localDB.getItemsFromWatched());
  }
}

function renderQueue() {
  if (localDB.getItemsFromQueue() === null || localDB.getItemsFromQueue().length === 0) {
    document.querySelector('.films__list').innerHTML = emptyPageMessage;
  } else {
    renderGallery(localDB.getItemsFromQueue());
  }
}

export { renderApp, renderMoviesList };
