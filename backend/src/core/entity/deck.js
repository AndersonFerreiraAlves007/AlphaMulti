const Card = require('./card');

class Deck {
  constructor() {
    this.cards = [];
    this.cardsDiscarded = [];
  }

  build() {
    this.cards = [];
    const colors = ['RED','GRE','BLU','YEL'];
    const especialCards = ['COR','PL4'];
    for(let j = 0; j < colors.length; j++) {
      this.cards.push(new Card(colors[j], '0'));
      for(let i = 1; i < 10; i++) {
        this.cards.push(new Card(colors[j], `${i}`));
        this.cards.push(new Card(colors[j], `${i}`));
      }
      this.cards.push(new Card(colors[j], 'SKI'));
      this.cards.push(new Card(colors[j], 'SKI'));
      this.cards.push(new Card(colors[j], 'REV'));
      this.cards.push(new Card(colors[j], 'REV'));
      this.cards.push(new Card(colors[j], 'PL2'));
      this.cards.push(new Card(colors[j], 'PL2'));
    }
    for(let i = 0; i < especialCards.length; i++) {
      this.cards.push(new Card('BLA', especialCards[i]));
      this.cards.push(new Card('BLA', especialCards[i]));
      this.cards.push(new Card('BLA', especialCards[i]));
      this.cards.push(new Card('BLA', especialCards[i]));
    }
  }

  discard(card) {
    this.cardsDiscarded.push(card);
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  drawFromDeck() {
    if(this.cards.length === 0) {
      this.cards = this.cardsDiscarded;
      this.cardsDiscarded = [];
    }
    return this.cards.pop();
  }
}

module.exports = Deck;
