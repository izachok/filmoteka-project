export const pageState = {
  isWatched: false,
  isQueue: false,
  query: '',
  isHome() {
    return !isQueue && !isWatched;
  },
};
