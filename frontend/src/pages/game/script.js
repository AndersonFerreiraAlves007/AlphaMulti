import Deck from '../../utils/deck.js';

// serve para estanciar um deck já embaralhado
const deck = new Deck();
deck.shuffle();
console.log(deck.cards);

// testando cards
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomNumber = getRandomIntInclusive(0, deck.cards.length);
console.log(deck.cards[randomNumber]);
const suit = deck.cards[randomNumber].suit;
const value = deck.cards[randomNumber].value;

const body = document.querySelector('body');
const card = document.getElementById('card');
card.classList.add(`${suit}${value}`);

body.append(card);

// colocar time e borda na user__photo quando for jogar
