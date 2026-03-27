export let totalTime = 60;
export let intervalId = null;

export function startTimer(getTotalFlips) {
  const timeEl = document.querySelector('.state__time');
  const movesEl = document.querySelector('.state__moves');

  intervalId = setInterval(() => {
    totalTime--;
    timeEl.textContent = `Время: ${totalTime} сек`;
    movesEl.textContent = `Шаги: ${getTotalFlips()} шагов`;

    if (totalTime <= 0) {
      stopTimer();
      alert('Время вышло! Игра окончена.');
    }
  }, 1000);
}

export function stopTimer() {
  clearInterval(intervalId);
}
