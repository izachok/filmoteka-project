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
    onShow: turnOnAutoSlider,
    onClose: turnOffAutoSlider,
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

export { createFooterModal, showFooterModal };
