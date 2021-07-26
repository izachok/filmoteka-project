import * as basicLightbox from 'basiclightbox';

let modalInstance = null;

const refs = {
  modalOpenLink: document.querySelector('.js-footer-modal'),
};

function createFooterModal() {
  modalInstance = basicLightbox.create(document.getElementById('footer-modal'));

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
}

export { createFooterModal, showFooterModal };
