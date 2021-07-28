function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function addToLocalStorageArray(key, item) {
    if (localStorage.getItem(key) == null) {
        saveToLocalStorage(key, [])
    }

    let array = getFromLocalStorage(key);
    let isExist = array.findIndex(function (elem) { return elem.id === item.id}) !== -1;
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
    let isExist = array.findIndex(function (elem) { return elem.id === item.id}) !== -1;
    return isExist;
}

function removeFromLocalStorageArray (key, item) {
    let array = getFromLocalStorage(key);
    let itemIndex = array.findIndex(function (elem) { return elem.id === item.id});
    array.splice(itemIndex);
    return saveToLocalStorage(key, array);
}

function isInWatched(objModel) {
    return isInArray("watched", objModel);
}

function isInQueue(objModel) {
    return isInArray("queue", objModel);
}

function addItemToWatched(objModel) {
   addToLocalStorageArray("watched", objModel);
}

function addItemToQueue(objModel) {
    addToLocalStorageArray("queue", objModel); 
}

function removeFromWatched (item) {
    removeFromLocalStorageArray ('watched', item) 
}

function removeFromQueue (item) {
    removeFromLocalStorageArray ('queue', item) 
}

function getItemsFromWatched() {
    return getFromLocalStorage('watched')
}

function getItemsFromQueue() {
    return getFromLocalStorage('queue')
}

export {addItemToWatched, addItemToQueue, removeFromWatched, removeFromQueue, isInWatched, isInQueue, getItemsFromWatched, getItemsFromQueue};
