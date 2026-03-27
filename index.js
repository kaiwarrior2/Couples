import { createBoard } from './scripts/createBoard.js';
import { startTimer } from './scripts/timer.js';
import { totalFlips } from './scripts/gameLogic.js';

const gameBoard = document.querySelector('.main');
const startBtn = document.querySelector('.board__button');
const input = document.querySelector('.board__input');

startBtn.addEventListener('click', () => {
  const columns = parseInt(input.value);
  if (!columns || columns < 2 || columns > 6 || columns % 2 !== 0) return;
  const count = columns * columns;
  gameBoard.querySelector('.board').style.display = 'none';
  createBoard(columns, count);
  startTimer(() => totalFlips);
});
