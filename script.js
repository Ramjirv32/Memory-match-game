const gameContainer = document.querySelector('.game-container');
const symbols = ['🍎', '🍌', '🍇', '🍓', '🍍', '🍉', '🥝', '🍒'];
const cards = [...symbols, ...symbols];
cards.sort(() => Math.random() - 0.5);

cards.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.innerText = '?';
  gameContainer.appendChild(card);
});
let firstCard = null;
let secondCard = null;

document.querySelector('.game-container').addEventListener('click', (e) => {
  const card = e.target;

if (card.classList.contains('flipped') || firstCard && secondCard) return;

  card.classList.add('flipped');
  card.innerText = card.dataset.symbol;

if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      firstCard = null;
      secondCard = null;
} else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
     firstCard.innerText = '?';
          secondCard.innerText = '?';
        firstCard = null;
        secondCard = null;
      }, 1000);
 }
}});

