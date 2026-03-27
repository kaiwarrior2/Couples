import { createCard, createIconsArray } from './cards.js';
import { startTimer } from './timer.js';
import { totalFlips } from './gameLogic.js';

const gameBoard = document.querySelector('.main');

export function createBoard(columns, count) {
  const template = document.getElementById('gameTableTemplate').content.cloneNode(true);

  const table = template.querySelector('.table');
  table.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  table.style.gridTemplateRows = `repeat(${columns}, 1fr)`;

  const icons = createIconsArray(count);
  icons.forEach(icon => table.append(createCard(icon)));

  const restartBtn = template.querySelector('.table__button');
  restartBtn.addEventListener('click', () => location.reload());

  gameBoard.appendChild(table);
  gameBoard.appendChild(restartBtn);

  startTimer(() => totalFlips);
}
