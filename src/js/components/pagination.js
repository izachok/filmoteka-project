import { renderTopMovies } from './rendering-top-movies';

const refs = {
  pagination: document.querySelector('.pagination'),
  btn1: document.querySelector('#btn1'),
  btn2: document.querySelector('#btn2'),
  btn3: document.querySelector('#btn3'),
  btn4: document.querySelector('#btn4'),
  btn5: document.querySelector('#btn5'),
  btn6: document.querySelector('#btn6'),
  btn7: document.querySelector('#btn7'),
  btnLeft: document.querySelector('#btn-left'),
  btnRight: document.querySelector('#btn-right'),
  dotsLeft: document.querySelector('#dots-left'),
  dotsRight: document.querySelector('#dots-right'),
};

refs.pagination.addEventListener('click', onBtnClick);
let currentPage = 1;

function onBtnClick(event) {
  if (event.target.tagName === 'BUTTON') {
    const activeBtn = event.target.textContent;

    currentPage = Number(activeBtn);

    const btn1 = refs.btn1;
    const btn2 = refs.btn2;
    const btn3 = refs.btn3;
    const btn4 = refs.btn4;
    const btn5 = refs.btn5;
    const btn6 = refs.btn6;
    const btn7 = refs.btn7;
    // const btnLeft = refs.btnLeft;
    // const btnRight = refs.btnRight;

    if (event.target.classList.contains('page-btn') && currentPage < 6) {
      setBtnActiveStyle(event);
    }

    if (currentPage >= 6 || !refs.dotsLeft.classList.contains('visually-hidden')) {
      btn1.classList.remove('active');
      btn2.classList.remove('active');
      btn3.classList.remove('active');
      btn5.classList.remove('active');
      btn6.classList.remove('active');
      btn7.classList.remove('active');
      btn4.classList.add('active');
    }

    if (currentPage >= 3 || activeBtn === btn6.textContent) {
      refs.dotsLeft.classList.remove('visually-hidden');
      btn4.textContent = currentPage;

      btn2.textContent = Number(btn4.textContent) - 2;
      btn3.textContent = Number(btn4.textContent) - 1;
      btn5.textContent = Number(btn4.textContent) + 1;
      btn6.textContent = Number(btn4.textContent) + 2;
      currentPage = btn4.textContent;
    }

    if (btn7.textContent === currentPage) {
      refs.dotsRight.classList.add('visually-hidden');
      btn4.classList.remove('active');
      btn7.classList.add('active');
      btn6.textContent = Number(btn7.textContent) - 1;
      btn5.textContent = Number(btn7.textContent) - 2;
      btn4.textContent = Number(btn7.textContent) - 3;
      btn3.textContent = Number(btn7.textContent) - 4;
      btn2.textContent = Number(btn7.textContent) - 5;
    }

    if (currentPage <= 4) {
      resetPagination();
    }

    if (currentPage === 1) {
      btn4.classList.remove('active');
      btn1.classList.add('active');
      resetPagination();
    }
  }
  renderTopMovies(currentPage);
}

let btns = document.querySelectorAll('.page-btn');

function setBtnActiveStyle(event) {
  let btnEvent = event.target;
  btns.forEach(el => el.classList.remove('active'));
  if (btnEvent.classList.contains('page-btn')) {
    btnEvent.classList.add('active');
  }
}

function resetPagination() {
  refs.dotsLeft.classList.add('visually-hidden');

  btn2.textContent = '2';
  btn3.textContent = '3';
  btn4.textContent = '4';
  btn5.textContent = '5';
  btn6.textContent = '6';
}
