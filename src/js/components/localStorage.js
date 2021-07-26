var resultSection = document.querySelector('section.films'),
    watchedBtn = document.querySelector('.watched'),
    queueBtn = document.querySelector('.queue'),
    isWatched = false,
    isInQueue = false;

    watchedBtn.addEventListener('click', addToWatched);
    queueBtn.addEventListener('click', addToQueue);   



function getStorageStatus () {
    try {
      const watched = localStorage.getItem('watched');
      const inQueue = localStorage.getItem('inQueue');
  
      if (watched === null ||  watched === undefined || watched.length === 0) {
        watched = [];
        getEmptyLibrary();
      } else if (isWatched = true) {
        watched = JSON.parse(watched)
      }

      if (inQueue === null ||  inQueue === undefined || inQueue.length === 0) {
        inQueue = [];
        getEmptyLibrary();
      } else if (isInQueue = true) {
        inQueue = JSON.parse(inQueue)
      }
    } 
    catch (err) {
      console.error('Get state error: ', err);
    }
  };


function addToWatched () {

    localStorage.setItem('watched', "id")

    watchedBtn.innerHTML = "Remove from watched";
    isWatched = true;

    watchedBtn.removeEventListener("click", addToWatched);
    watchedBtn.addEventListener("click", removeFromWatched);
}

function addToQueue () {

    localStorage.setItem('inQueue', "id")


    queueBtn.innerHTML = "Remove from queue";
    isInQueue = true;

    queueBtn.removeEventListener("click", addToQueue);
    queueBtn.addEventListener("click", removeFromQueue)
}

function removeFromWatched () {
    localStorage.removeItem('watched');

    watchedBtn.innerHTML = "Add to watched";
    isWatched = false;


    watchedBtn.removeEventListener("click", removeFromWatched);
    watchedBtn.addEventListener("click", addToWatched);
}

function removeFromQueue () {
    localStorage.removeItem('inQueue');

    queueBtn.innerHTML = "Add to queue";
    isInQueue = false;

    queueBtn.removeEventListener("click", removeFromQueue);
    queueBtn.addEventListener("click", addToQueue)
}


function getEmptyLibrary () {
    resultSection.insertAdjacentHTML("afterbegin", getMessageMarkup);
    function getMessageMarkup () {
        "<h2 class='empty-msg'>There's nothing here.. <a href='#home' class='link'>Yet.</a></h2>"
    }
}