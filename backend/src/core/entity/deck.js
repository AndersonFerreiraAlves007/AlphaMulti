const Card = require('./card');
const {
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_ESPECIAL,
  COLOR_RED,
  COLOR_YELLOW,
  VALUE_JOCKER,
  VALUE_M2,
  VALUE_M4,
  VALUE_REVERTE,
  VALUE_SKIP
} = require('../utils/constants');

class Deck {
  constructor() {
    this.cards = [];
    this.cardsDiscarded = [];
  }

  build() {
    this.cards = [];
    this.cardsDiscarded = [];
    const colors = [ COLOR_BLUE, COLOR_GREEN, COLOR_RED, COLOR_YELLOW];
    const especialCards = [VALUE_JOCKER, VALUE_M4];
    for(let j = 0; j < colors.length; j++) {
      this.cards.push(new Card(colors[j], '0'));
      for(let i = 1; i < 10; i++) {
        this.cards.push(new Card(colors[j], `${i}`));
        this.cards.push(new Card(colors[j], `${i}`));
      }
      this.cards.push(new Card(colors[j], VALUE_SKIP));
      this.cards.push(new Card(colors[j], VALUE_SKIP));
      this.cards.push(new Card(colors[j], VALUE_REVERTE));
      this.cards.push(new Card(colors[j], VALUE_REVERTE));
      this.cards.push(new Card(colors[j], VALUE_M2));
      this.cards.push(new Card(colors[j], VALUE_M2));
    }
    for(let i = 0; i < especialCards.length; i++) {
      this.cards.push(new Card(COLOR_ESPECIAL, especialCards[i]));
      this.cards.push(new Card(COLOR_ESPECIAL, especialCards[i]));
      this.cards.push(new Card(COLOR_ESPECIAL, especialCards[i]));
      this.cards.push(new Card(COLOR_ESPECIAL, especialCards[i]));
    }
  }

  discard(card) {
    this.cardsDiscarded.push(card);
  }

  getTopCardsDiscarded() {
    return this.cardsDiscarded[this.cardsDiscarded.length - 1];
  }

  /* shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  } */

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  drawFromDeck() {
    if(this.cards.length === 0) {
      this.cards = this.cardsDiscarded;
      this.cardsDiscarded = [];
      this.cardsDiscarded.push(this.cards.pop());
    }
    return this.cards.pop();
  }
}

module.exports = Deck;
