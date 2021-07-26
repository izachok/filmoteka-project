document.querySelector('section.films').insertAdjacentHTML("afterbegin", '<button class="watched" style="width: 60px;">Add to watched</button><button class="queue" style="width: 60px;">Add to queue</button')

var watchedBtn = document.querySelector('.watched'),
    queueBtn = document.querySelector('.queue'),
    isWatched = false,
    isInQueue = false,
    watched = [],
    queue = [];

    watchedBtn.addEventListener('click', addToWatched);
    queueBtn.addEventListener('click', addToQueue);   



// to do: check the uniqueness of an object id
const userWatched = localStorage.getItem("watched");
if (userWatched) {
  watched.push(JSON.parse(userWatched));
}

const userQueue = localStorage.getItem("queue");
if (userQueue) {
  queue.push(JSON.parse(userQueue));
}


function addToWatched () {

    localStorage.setItem('watched', JSON.stringify(watched));

    watchedBtn.innerHTML = "Remove from watched";
    isWatched = true;

    watchedBtn.removeEventListener("click", addToWatched);
    watchedBtn.addEventListener("click", removeFromWatched);
}

function addToQueue () {

    localStorage.setItem('queue', JSON.stringify(queue));

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
    localStorage.removeItem('queue');

    queueBtn.innerHTML = "Add to queue";
    isInQueue = false;

    queueBtn.removeEventListener("click", removeFromQueue);
    queueBtn.addEventListener("click", addToQueue)
}


// function getEmptyLibrary () {
//     resultSection.insertAdjacentHTML("afterbegin", getMessageMarkup);
//     function getMessageMarkup () {
//         "<h2 class='empty-msg'>There's nothing here.. <a href='#home' class='link'>Yet.</a></h2>"
//     }
// }