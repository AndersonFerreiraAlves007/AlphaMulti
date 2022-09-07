import Deck from '../../utils/deck.js';

// serve para estanciar um deck já embaralhado
const deck = new Deck();
deck.shuffle();
console.log(deck.cards);
