import { getTrendingMovies } from "../api/moviesdb-api";
import { pageState } from "./pageState";
import { makeMoviesArrayForRendering, renderGallery } from "./rendering-movies";

const filmListRef = document.querySelector('.films__list')

function renderTopMovies(page) {

    if (pageState.isHome() === true ) {
        return getTrendingMovies(page)
            .then(makeMoviesArrayForRendering)
            .then(value => {
                return renderGallery(value, filmListRef)
            });
    }
}

export { renderTopMovies }

