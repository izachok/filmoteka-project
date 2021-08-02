import 'basiclightbox/dist/basicLightbox.min.css';
import '../sass/main.scss';

import { Notify } from 'notiflix';
import * as footerModal from './components/footer-modal';
import { PageState } from './components/page-state';
import { renderApp } from './components/renderer';

import './components/to-top-btn';

window.pageState = new PageState();
Notify.init({
  width: '350px',
  distance: '20px',
  timeout: 1500,
  closeOnClick: true,
});

renderApp();
footerModal.createFooterModal();
