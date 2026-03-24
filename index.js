const gameBoard = document.querySelector('.main');
const startBtn = document.querySelector('.board__button');
const input = document.querySelector('.board__input');

startBtn.addEventListener('click', () => {
    const columns = parseInt(input.value);
    if (!columns || columns < 2 || columns > 6) return;
    const count = columns * columns;
    gameBoard.querySelector('.board').style.display = 'none';
    createBoard(columns, count);
    startTimer();
});

function shuffleArray(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    currentIndex--;
    const randomIndex = Math.floor(Math.random() * currentIndex);
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function dublicateElements(array) {
    const result = [];
    array.forEach(item => result.push(item, item));
    return result;
}

function createIconsArray(initialCount) {
    const cardsIcons = [
        'compass', 'cloud', 'play', 'bolt', 'stop', 'cogs', 'atom', 'basketball-ball',
        'arrows', 'angle-left', 'bars', 'file', 'filter', 'gear', 'folder',
        'folder-open', 'shield', 'scissors', 'pen-clip'
    ];
    let cards = cardsIcons.slice(0, Math.floor(initialCount / 2));
    const doubleCards = dublicateElements(cards);
    return shuffleArray(doubleCards);
}

const couple = {
  first: null,
  firstClickable: true,
  second: null,
  secondClickable: true
};

let totalTime = 60;
let totalFlips = 0;
let intervalId = null;
let gameOver = false;

function startTimer() {
  const timeEl = document.querySelector('.state__time');
  const movesEl = document.querySelector('.state__moves');

  intervalId = setInterval(() => {
    totalTime--;
    timeEl.textContent = `Время: ${totalTime} сек`;
    movesEl.textContent = `Шаги: ${totalFlips} шагов`;

    if (totalTime <= 0) {
      clearInterval(intervalId);
      gameOver = true;
      alert('Время вышло! Игра окончена.');
    }
  }, 1000);
}

function isWin() {
  const gameTable = document.querySelector('.table');
  if (Array.from(gameTable.children).every((card) => card.classList.contains('flip'))) {
    clearInterval(intervalId);
    setTimeout(() => {
      alert('Поздравляем! Вы нашли все пары! 🎉');
    }, 1000);
  }
}

function gameLogic(card) {
  if (gameOver) return;
  if (!couple.firstClickable && !couple.secondClickable) return;

  card.classList.add('flip');
  totalFlips++;

  if (couple.first === null) {
    couple.first = card;
    couple.firstClickable = false;
  } else if (couple.second === null && couple.first !== card) {
    couple.second = card;
    couple.secondClickable = false;
  }

  if (couple.first === null || couple.second === null) return;

  const isEqual = couple.first.firstElementChild.classList[2] === couple.second.firstElementChild.classList[2];

  if (isEqual) {
    setTimeout(() => {
      couple.first.classList.add('successfully');
      couple.second.classList.add('successfully');
      refresh();
    }, 1000);
  } else {
    setTimeout(() => {
      couple.first.classList.remove('flip');
      couple.second.classList.remove('flip');
      refresh();
    }, 1000);
  }

  function refresh() {
    couple.first = null;
    couple.second = null;
    couple.firstClickable = true;
    couple.secondClickable = true;
  }
}

function createCard(flippedIcon) {
    const template = document.getElementById('cardTemplate').content.cloneNode(true);
    const card = template.querySelector('.card');
    const iconEl = card.querySelector('.flipped-icon');
    iconEl.classList.add(`fa-${flippedIcon}`);
    card.addEventListener('click', () => gameLogic(card));
    return card;
}

function createBoard(columns, count) {
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
}
