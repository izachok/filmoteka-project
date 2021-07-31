import { getMoviesByQuery } from '../api/moviesdb-api';
import { makeMoviesArrayForRendering, renderGallery } from './rendering-movies';
import { renderMoviesList } from './renderer';
import { renderTopMovies } from './rendering-top-movies';
import { Notify } from 'notiflix';
Notify.init({ width: '350px', distance: '20px', closeButton: true });

const refs = {
  searchInputEl: null,
  searchFormEl: null,
  searchButtonEl: null,
};

const onFormSubmit = async function (event) {
  event.preventDefault();
  const query = refs.searchInputEl.value;

  if (query.trim() === '') {
    return;
  }

  pageState.query = query;

  const queryResult = await getMoviesByQuery(query);
  const filmsArray = makeMoviesArrayForRendering(queryResult);
  if (queryResult.total_results === 0) {
    Notify.warning('Search result not successful. Enter the correct movie name and ');
    refs.searchInputEl.value = '';
    return renderTopMovies();
  }
  renderMoviesList(filmsArray);

  refs.searchInputEl.value = '';

  // todo: add function for create pagination
};

export const initSearch = function () {
  refs.searchInputEl = document.querySelector('input[name="query"]');
  refs.searchFormEl = document.querySelector('.header__search-form');
  refs.searchButtonEl = document.querySelector('.button-search');
  refs.searchButtonEl?.addEventListener('click', onFormSubmit);
  refs.searchFormEl?.addEventListener('submit', onFormSubmit);
};
