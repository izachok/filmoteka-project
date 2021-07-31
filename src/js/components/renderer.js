import { renderGallery } from './rendering-movies.js';
import * as localDB from './localDB';
import { initLibraryHeaderBtns } from './functionality-watched-queue-button';
import header from './../../templates/header.hbs';
import { renderTopMovies } from './rendering-top-movies';
import { initSearch } from './search';
import { initNavigation } from './navigation';

function renderApp() {
  renderHeader();
  renderMoviesList();
}

function renderHeader() {
  // window.onload = document.querySelector('button[page="home"]').className('active-page');
  const headerEL = document.querySelector('.page-header');
  headerEL.insertAdjacentHTML('beforeend', header({ ...pageState, isHome: pageState.isHome }));

  initLibraryHeaderBtns();
  initNavigation();
  initSearch();
}

function renderMoviesList(movies) {
  const emptyPageMessage = '<span class="list-is-empty__text">This list is empty</span>';

  if (pageState.isHome) {
    if (pageState.query) {
      //show search result
      renderGallery(movies);
      //for preventing showing same search results next time
      pageState.query = '';
    } else {
      //show trending movies
      renderTopMovies();
    }
  } else if (pageState.isWatched) {
    //show watched library
    if (localDB.getItemsFromWatched() === null || localDB.getItemsFromWatched().length === 0) {
      document.querySelector('.films__list').innerHTML = emptyPageMessage;
    } else {
      renderGallery(localDB.getItemsFromWatched());
    }
  } else {
    //show queue library
    if (localDB.getItemsFromQueue() === null || localDB.getItemsFromQueue().length === 0) {
      document.querySelector('.films__list').innerHTML = emptyPageMessage;
    } else {
      renderGallery(localDB.getItemsFromQueue());
    }
  }
  //page was rerendered so wasLibraryChanged must be reseted
  pageState.wasLibraryChanged = false;
}

export { renderApp, renderMoviesList };
