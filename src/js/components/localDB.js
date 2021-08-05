function getFromLocalStorage(key, page = 1, perPage = 0) {
  const results = JSON.parse(localStorage.getItem(key));
  if (!perPage) {
    return results;
  }
  return results.slice(perPage * (page - 1), perPage * page);
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function addToLocalStorageArray(key, item) {
  if (localStorage.getItem(key) == null) {
    saveToLocalStorage(key, []);
  }

  let array = getFromLocalStorage(key);
  let isExist =
    array.findIndex(function (elem) {
      return elem.id === item.id;
    }) !== -1;
  if (!isExist) {
    array.push(item);
  }
  saveToLocalStorage(key, array);
}

function isInArray(key, item) {
  if (localStorage.getItem(key) == null) {
    return false;
  }

  let array = getFromLocalStorage(key);
  let isExist =
    array.findIndex(function (elem) {
      return elem.id === item.id;
    }) !== -1;
  return isExist;
}

function removeFromLocalStorageArray(key, item) {
  let array = getFromLocalStorage(key);
  let itemIndex = array.findIndex(function (elem) {
    return elem.id === item.id;
  });
  array.splice(itemIndex, 1);
  return saveToLocalStorage(key, array);
}

function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

function isInWatched(objModel) {
  return isInArray('watched', objModel);
}

function isInQueue(objModel) {
  return isInArray('queue', objModel);
}

function addItemToWatched(objModel) {
  addToLocalStorageArray('watched', objModel);
}

function addItemToQueue(objModel) {
  addToLocalStorageArray('queue', objModel);
}

function removeFromWatched(item) {
  removeFromLocalStorageArray('watched', item);
}

function removeFromQueue(item) {
  removeFromLocalStorageArray('queue', item);
}

function getItemsFromWatched(page = 1, perPage = 0) {
  return getFromLocalStorage('watched', page, perPage);
}

function getItemsFromQueue(page = 1, perPage = 0) {
  return getFromLocalStorage('queue', page, perPage);
}

export {
  addItemToWatched,
  addItemToQueue,
  removeFromWatched,
  removeFromQueue,
  isInWatched,
  isInQueue,
  getItemsFromWatched,
  getItemsFromQueue,
  removeFromLocalStorage,
};
