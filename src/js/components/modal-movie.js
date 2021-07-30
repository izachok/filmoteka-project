import * as basicLightbox from 'basiclightbox';
import modalWindowMovie from '../../templates/modalWindowMovie';

class OpenModal {
  constructor(argument) {
    this.instance = basicLightbox.create(modalWindowMovie(argument), {
      onClose: this.onCloseModal,
      onShow: this.onShowModal,
    });
  }

  showModal() {
    return this.instance.show();
  }

  onShowModal() {
    window.addEventListener('keydown', this.turnOnKeys);
  }

  onCloseModal() {
    window.removeEventListener('keydown', this.turnOnKeys);
  }

  turnOnKeys(event) {
    console.log('hey');
    if (event.keyCode === 27) {
      console.log(event);
      this.instance.close();
    }
  }
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
