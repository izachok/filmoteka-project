export const pageState = {
  isWatched: false,
  isQueue: false,
  query: '',
  isHome() {
    return !this.isQueue && !this.isWatched;
  },
};

export function setIsWatched(value){
  pageState.isWatched = value;
}

export function setIsQueue(value){
  pageState.isQueue = value;
}