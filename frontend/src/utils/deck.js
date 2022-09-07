const SUITS = ['b', 'g', 'r', 'y'];
const VALUES = ['t', 'm2', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberofCards() {
    return this.cards.length;
  }

  shuffle() {
    for (let i = this.numberofCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

function freshDeck() {
  const data = SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });

  const values = ['m4', 's1'];
  for (let i = 0; i < 2; i++) {
    values.map((value) => {
      data.push(new Card('s', value));
    });
  }
  return data;
}
