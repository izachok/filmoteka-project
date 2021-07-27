import { pageState } from './pageState';
import { getMoviesByQuery } from '../api/moviesdb-api';
import { makeMoviesArrayForRendering, renderGallery } from './rendering-movies';

const refs = {
  searchInputEl: document.querySelector('input[name="query"]'),
  searchFormEl: document.querySelector('.header__search-form'),
  searchButtonEl: document.querySelector('.icon-search'), //todo: change selector for icon on selector for button
  filmsListEl: document.querySelector('.films__list'),
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
  refs.searchButtonEl.addEventListener('click', onFormSubmit);
  refs.searchFormEl.addEventListener('submit', onFormSubmit);
};
