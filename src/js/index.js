import 'basiclightbox/dist/basicLightbox.min.css';
import '../sass/main.scss';

import * as footerModal from './components/footer-modal';
import { PageState } from './components/page-state';
import { renderApp } from './components/renderer';

import './components/to-top-btn';

window.pageState = new PageState();

renderApp();
footerModal.createFooterModal();
