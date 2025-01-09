const gameContainer = document.querySelector('.game-container');
const symbols = [
  '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🏏'   
     
];

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
let matchedPairs = 0;
const totalPairs = symbols.length;

function checkAllMatched() {
  if (matchedPairs === totalPairs) {
    showCongratulations();
  }
}

function showCongratulations() {
  Swal.fire({
    title: 'Congratulations!',
    text: 'You\'ve matched all the cards!',
    icon: 'success',
    confirmButtonText: 'Play Again',
    confirmButtonColor: '#0070f3',
    background: '#111111',
    color: '#ffffff',
    iconColor: '#0070f3',
    position: 'top-end',
    toast: true,
    timer: 5000,
    timerProgressBar: true,
    showConfirmButton: false
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
}

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
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matchedPairs++;
      checkAllMatched();
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
  }
});

