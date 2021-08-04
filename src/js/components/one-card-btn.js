import LibraryBtn from './library-btn';
import libraryType from './library-type';

function createCardOverlay(movieObjs) {
  if (pageState.isHome) {
    const cards = document.querySelectorAll('.one-card_overlay');

    cards.forEach((card, index) => {
      const watchBtnOne = new LibraryBtn({
        element: card.querySelector('[data-action="add-to-watched_one-card"]'),
        movieObj: movieObjs[index],
        type: libraryType.WATCHED,
      });

      const queueBtnOne = new LibraryBtn({
        element: card.querySelector('[data-action="add-to-queue_one-card"]'),
        movieObj: movieObjs[index],
        type: libraryType.QUEUE,
      });
    });
  } else {
    const oneCardBtn = document.querySelectorAll('.one-card_overlay');
    [...oneCardBtn].map(element => element.classList.add('visually-hidden'));
  }
}

export { createCardOverlay };
