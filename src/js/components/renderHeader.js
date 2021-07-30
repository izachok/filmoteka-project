import header from './../../templates/header.hbs';
import { pageState } from './pageState';

export function renderHeader() {
  const headerEL = document.querySelector('.page-header');
  headerEL.insertAdjacentHTML(
    "beforeend",
    header({...pageState, isHome: pageState.isHome()})
  );
}