import * as basicLightbox from 'basiclightbox';
import modalWindowMovie from '../../templates/modalWindowMovie';

function showModal(obj) {
  const instance = basicLightbox.create(modalWindowMovie(obj));
  console.log('im here');
  return instance.show();
}

// showModal(obj);

export { showModal };
