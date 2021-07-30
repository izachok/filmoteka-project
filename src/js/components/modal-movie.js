import * as basicLightbox from 'basiclightbox';
import modalWindowMovie from '../../templates/modalWindowMovie';
import libraryType from './library-type';
import LibraryBtn from './library-btn';
import { renderMoviesList } from './renderer';

class OpenModal {
  constructor(argument) {
    this.movieObj = argument;
    this.instance = basicLightbox.create(modalWindowMovie(argument), {
      onClose: this.onCloseModal,
      onShow: this.onShowModal,
    });
  }

  showModal() {
    this.instance.show();

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
        return this.instance.close();
      }
    });
  }

  onShowModal() {
    window.addEventListener('keydown', this.turnOnKeys);
  }

  onCloseModal() {
    window.removeEventListener('keydown', this.turnOnKeys);

    //todo move to metod closes modal in future
    //rerender movies list if add/remove buttons were clicked
    if (!pageState.isHome && pageState.wasLibraryChanged) {
      renderMoviesList();
    }
  }

  // turnOnKeys(event) {
  //   console.log('hey');
  //   if (event.keyCode === 27) {
  //     console.log(event);
  //     this.instance.close();
  //   }
  // }
}

// function showModal(obj) {
//   const modalInstance = basicLightbox.create(modalWindowMovie(obj), {
//     onClose: onCloseModal,
//     onShow: onShowModal,
//   });

//   return modalInstance.show();
// }

// function onShowModal() {
//   window.addEventListener('keydown', turnOnKeys);
// }

// function onCloseModal() {
//   window.removeEventListener('keydown', turnOnKeys);
// }

// const turnOnKeys = event => {
//   if (event.keyCode === 27) {
//     modalInstance.close();
//     return;
//   }
// };

export { OpenModal };
// export { showModal, onShowModal, onCloseModal, turnOnKeys };
