import * as basicLightbox from 'basiclightbox';
import { initSlider, turnOnAutoSlider, turnOffAutoSlider } from './slider';

let modalInstance = null;

const refs = {
  modalOpenLink: document.querySelector('.js-footer-modal'),
  footerModal: document.getElementById('footer-modal'),
};
refs.sliderContainer = refs.footerModal.querySelector('.slider');

function createFooterModal() {
  modalInstance = basicLightbox.create(refs.footerModal, {
    onShow: onModalFooterShow,
    onClose: onModalFooterClose,
  });
  bindEvents();
}

function bindEvents() {
  refs.modalOpenLink.addEventListener('click', e => {
    e.preventDefault();
    showFooterModal();
  });
  modalInstance
    .element()
    .querySelector('[data-action="modal-close"]')
    .addEventListener('click', () => {
      modalInstance.close();
    });
}

function showFooterModal() {
  modalInstance.show();
  initSlider();
}

function onModalFooterShow(event) {
  turnOnAutoSlider();
  window.addEventListener('keydown', onWindowKeydown);
}

function onModalFooterClose() {
  turnOffAutoSlider();
  window.removeEventListener('keydown', onWindowKeydown);
}

function onWindowKeydown(event) {
  if (event.code === 'Escape') {
    modalInstance.close();
  }
}
export { createFooterModal, showFooterModal };
