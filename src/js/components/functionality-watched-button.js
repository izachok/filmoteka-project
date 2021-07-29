import { makeMoviesArrayForRendering, renderGallery } from "./rendering-movies.js";
import * as localDB from './localDB';
import libraryType from './library-type';

const refs = {
    watchedBtnRef : document.querySelector('.watched'),
    containerFilmsRef : document.querySelector('.container'),
    filmListRef : document.querySelector('.films__list'),
}

function onClickWatched() {

    refs.watchedBtnRef.addEventListener('click', onClickWatchedBtn);

    function onClickWatchedBtn() {
        
        if (localStorage.getItem(libraryType.WATCHED) === '[]' ) {
            const htmlString ='<span class="list-is-empty__text">This list is empty</span>';
            return refs.containerFilmsRef.innerHTML = htmlString;
        } else {
            
            return renderGallery(localDB.getItemsFromWatched(), refs.filmListRef)
        }
    }
}

export { onClickWatched }

