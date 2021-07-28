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

    var array = getFromLocalStorage(key);
    var isExist = array.findIndex(function (elem) { return elem.id === item.id}) !== -1;
    if (!isExist) {
        array.push(item);
    }
    saveToLocalStorage(key, array);
}

function isInArray(key, item) {
    if (localStorage.getItem(key) == null) {
        return false;
    }

    var array = getFromLocalStorage(key);
    var isExist = array.findIndex(function (elem) { return elem.id === item.id}) !== -1;
    return isExist;
}

function removeFromLocalStorageArray (key, item) {
    var array = getFromLocalStorage(key);
    var itemIndex = array.findIndex(function (elem) { return elem.id === item.id});
    var newArr = array.splice(itemIndex, item);

    saveToLocalStorage(key, newArr);
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

function removeFromWatched (objModel) {
    removeFromLocalStorageArray ('watched', objModel)
}

function removeFromQueue (objModel) {
    removeFromLocalStorageArray ('queue', objModel)
}

export {addItemToWatched, addItemToQueue, removeFromWatched, removeFromQueue, isInWatched, isInQueue};
