import { gameLogic } from './gameLogic.js';

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

export function createIconsArray(initialCount) {
  const cardsIcons = [
    'compass', 'cloud', 'play', 'bolt', 'stop', 'cogs', 'atom', 'basketball-ball',
    'arrows', 'angle-left', 'bars', 'file', 'filter', 'gear', 'folder',
    'folder-open', 'shield', 'scissors', 'pen-clip'
  ];
  const cards = cardsIcons.slice(0, Math.floor(initialCount / 2));
  return shuffleArray(dublicateElements(cards));
}

export function createCard(flippedIcon) {
  const template = document.getElementById('cardTemplate').content.cloneNode(true);
  const card = template.querySelector('.card');
  card.querySelector('.flipped-icon').classList.add(`fa-${flippedIcon}`);
  card.addEventListener('click', () => gameLogic(card));
  return card;
}
