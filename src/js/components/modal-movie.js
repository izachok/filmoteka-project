import * as basicLightbox from 'basiclightbox';
import modalWindowMovie from '../../templates/modalWindowMovie';
import libraryType from './library-type';
import LibraryBtn from './library-btn';
import { renderMoviesList } from './renderer';
import axios from 'axios';
import { handleFetch } from '../api/moviesdb-api';
import { getGenresByIds } from '../api/genres-library';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTZjNGIwYzQwMzI5N2JiZGM5NTAzNmMxMjkwYzc5NyIsInN1YiI6IjYwZjlhNmUyOTdmZGVjMDA3NGRlMmRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a83nORWttyE7amxmCMPeKf9lKvYOeGs30Ue0qmqjMEw';

// function genresForModal(array) {
//   const genresList = document.querySelector('.genre');
//   const strGenres = getGenresByIds(array);
//   // console.log(strGenres);
//   const allGenresArray = strGenres.flatMap(cat => cat.name);
//   // console.log(allGenresArray);
//   const metodJoin = allGenresArray.join(', ');
//   // console.log(metodJoin);
//   return (genresList.textContent = metodJoin);
// }
function genresForModal(array) {
  return (document.querySelector('.genre').textContent = getGenresByIds(array)
    .flatMap(cat => cat.name)
    .join(', '));
}

class OpenModal {
  constructor(arg1) {
    (this.movieObj = arg1),
      (this.id = this.movieObj.id),
      (this.instance = basicLightbox.create(modalWindowMovie(arg1), {
        onClose: this.onCloseModal,
        onShow: this.onShowModal,
      }));

class OpenModal {
  #windowKeyHandler = this.onWindowClick.bind(this);

  constructor(argument) {
    this.movieObj = argument;
    this.instance = basicLightbox.create(modalWindowMovie(argument), {
      onClose: () => {
        this.onCloseModal();
      },
      onShow: () => {
        this.onShowModal();
      },
    });
  }

  showModal() {
    this.instance.show();

    // console.log(this.movieObj);

    const watchBtn = new LibraryBtn({
      element: this.instance.element().querySelector('[data-action="add-to-watched"]'),
      movieObj: this.movieObj,
      type: libraryType.WATCHED,
    });

    const queueBtn = new LibraryBtn({
      element: this.instance.element().querySelector('[data-action="add-to-queue"]'),
      movieObj: this.movieObj,
      type: libraryType.QUEUE,
    });

    window.addEventListener('keydown', event => {
      if (event.keyCode === 27) {
        this.instance.close();
      }
    });

    document.querySelector('.modal__close').addEventListener('click', event => {
      return this.instance.close();
    });
  }

  onShowModal() {
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', this.#windowKeyHandler);
  }

  onCloseModal() {
    document.body.classList.remove('modal-open');
    window.removeEventListener('keydown', this.#windowKeyHandler);
    //rerender movies list if add/remove buttons were clicked
    if (!pageState.isHome && pageState.wasLibraryChanged) {
      renderMoviesList();
    }
  }

  getSimilarMovie = function () {
    console.log(this.id);
    return axios
      .get(`/movie/${this.id}/similar`)
      .then(response => console.log(response.data.results));
  };
  onWindowClick(event) {
    if (event.code === 'Escape') {
      this.instance.close();
    }
  }
}

    export { OpenModal, genresForModal };
