import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZjNGIwYzQwMzI5N2JiZGM5NTAzNmMxMjkwYzc5NyIsInN1YiI6IjYwZjlhNmUyOTdmZGVjMDA3NGRlMmRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a83nORWttyE7amxmCMPeKf9lKvYOeGs30Ue0qmqjMEw';

const handleFetch = function (response) {
  const spinner = document.getElementById('spinner');
  spinner.classList.add('is-visible');
  return response
    .then(function (response) {
      spinner.classList.remove('is-visible');
      return response.data;
    })
    .catch(function (error) {
      throw new Error(error.response.data.status_message);
    });
};

const getTrendingMovies = function (page = 1) {
  return handleFetch(axios.get(`/trending/movie/week?page=${page}`));
};

const getMoviesByQuery = function (query, page = 1) {
  return handleFetch(axios.get(`/search/movie?include_adult=false&query=${query}&page=${page}`));
};

const getMovieById = function (id) {
  return handleFetch(axios.get(`/movie/${id}`));
};

export { getTrendingMovies, getMoviesByQuery, getMovieById };
