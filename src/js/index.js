import 'basiclightbox/dist/basicLightbox.min.css';
import '../sass/main.scss';

import { Notify } from 'notiflix';
import * as footerModal from './components/footer-modal';
import { PageState } from './components/page-state';
import { renderApp } from './components/renderer';
import { createPagination } from './components/pagination';

import './components/to-top-btn';
import {switchTheme} from './components/theme-switcher';


window.pageState = new PageState();
Notify.init({
  width: '350px',
  distance: '20px',
  timeout: 1500,
  closeOnClick: true,
});

createPagination();
renderApp();
footerModal.createFooterModal();