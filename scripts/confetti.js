export function generateConfetti(num) {
  const colors = ['d13447', 'ffbf00', '263672'];
  const confettiArray = [];

  for (let i = 0; i < num; i++) {
    const confetti = document.createElement('div');

    confetti.style = `
      position: absolute;
      width: ${Math.random() * 20}px;
      height: ${Math.random() * 10}px;
      background-color: #${colors[Math.floor(Math.random() * colors.length)]};
      top: -10%;
      left: ${Math.random() * 100}%;
      opacity: ${Math.random() + 0.1};
      transform: rotate(${Math.random() * 360}deg);
      animation: moveDown ease-in-out ${((Math.random() + 0.2) * 10)}s infinite;
    `;

    confettiArray.push(confetti);
  }

  return confettiArray;
}
