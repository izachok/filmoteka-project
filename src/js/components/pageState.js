export const pageState = {
  isWatched: false,
  isQueue: false,
  query: '',
  isHome() {
    return !this.isQueue && !this.isWatched;
  },
};