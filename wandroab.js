const cards = [
    '1', '1',
    '2', '2',
    '3', '3',
    '4', '4',
    '5', '5',
    '6', '6',
    '7', '7',
    '8','8',
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.lenght - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array [j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    shuffle(cards);
    cards.forEach(card => { 
        const cardElement = document.createElement('div');

        cardElement.classList.add('card');
        cardElement.dataset.icon = card;

        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    });
}

function flipCard()  {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this,textContent = this.dataset.icon;

    if(!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}
    
function checkForMatch() {
    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {

    firstCard.removeEventListener('click', flipcard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [nul, null, false];
}

document.getElementById('reset-button').addEventListener('click', () => {
    document.querySelector(',game-board').innerHTML = '';
    createBoard();
});

createBoard();