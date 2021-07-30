import { pageState } from './pageState';
import { getMoviesByQuery } from '../api/moviesdb-api';
import { makeMoviesArrayForRendering, renderGallery } from './rendering-movies';

const refs = {
  searchInputEl: null,
  searchFormEl: null,
  searchButtonEl: null,
  filmsListEl: null,
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
  renderGallery(filmsArray, refs.filmsListEl);

  // todo: add function for create pagination
};

export const initSearch = function () {
  refs.searchInputEl = document.querySelector('input[name="query"]'),
  refs.searchFormEl = document.querySelector('.header__search-form'),
  refs.searchButtonEl = document.querySelector('.button-search'),
  refs.filmsListEl = document.querySelector('.films__list'),

  refs.searchButtonEl.addEventListener('click', onFormSubmit);
  refs.searchFormEl.addEventListener('submit', onFormSubmit);
};
