import { getMoviesByQuery } from '../api/moviesdb-api';
import { makeMoviesArrayForRendering, renderGallery } from './rendering-movies';
import { Notify } from 'notiflix';

const refs = {
  searchInputEl: null,
  searchFormEl: null,
  searchButtonEl: null,
};

const onFormSubmit = function (event) {
  event.preventDefault();
  const query = refs.searchInputEl.value;

  if (query.trim() === '') {
    Notify.warning('Please enter movie name and try again');
    return;
  }

  pageState.query = query;
  pagination.reset();
  RenderSearchResults();
};

export async function RenderSearchResults(page = 1) {
  try {
    const queryResult = await getMoviesByQuery(pageState.query, page);
    const filmsArray = makeMoviesArrayForRendering(queryResult);
    pagination.setTotalItems(queryResult.total_results);

    if (queryResult.total_results === 0) {
      Notify.warning('Search result not successful. Enter the correct movie name and try again');
      refs.searchInputEl.value = '';
      // renderTopMovies();
      return;
    }
    renderGallery(filmsArray);

    refs.searchInputEl.value = '';
  } catch (error) {
    Notify.failure(`${error}`);
  }
}

export const initSearch = function () {
  refs.searchInputEl = document.querySelector('input[name="query"]');
  refs.searchFormEl = document.querySelector('.header__search-form');
  refs.searchButtonEl = document.querySelector('.button-search');

  refs.searchButtonEl?.addEventListener('click', onFormSubmit);
  refs.searchFormEl?.addEventListener('submit', onFormSubmit);
};
