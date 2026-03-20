const gameBoard = document.querySelector('.main');
const startBtn = document.querySelector('.board__button');
const input = document.querySelector('.board__input');

startBtn.addEventListener('click', () => {
    const columns = parseInt(input.value);
    if (!columns || columns < 2 || columns > 6) return;
    const count = columns * columns;
    gameBoard.querySelector('.board').style.display = 'none';
    createBoard(columns, count);
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

function createCard(flippedIcon) {
    const template = document.getElementById('cardTemplate').content.cloneNode(true);
    const card = template.querySelector('.card');
    const iconEl = card.querySelector('.flipped-icon');
    iconEl.classList.add(`fa-${flippedIcon}`);
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
