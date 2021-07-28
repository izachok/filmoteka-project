export function initLibrary() {

  const navLibraryEls = document.getElementsByClassName('library-button');

  for (let i = 0; i < navLibraryEls.length; i++) {
      let navLibraryEl = navLibraryEls[i];
      navLibraryEl.onclick = changePage;
  }
}

function changePage(event) {
  console.log (navLibraryEls);
  changeButtonColor(event);
}

function changeButtonColor(event){
    const navElsArray = [...navLibraryEls];
    navElsArray.forEach(el => el.classList.remove('library-button_active'));
    event.currentTarget.classList.add('library-button_active');
}