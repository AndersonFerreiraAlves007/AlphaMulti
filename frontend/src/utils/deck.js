const SUITS = ['b', 'g', 'r', 'y'];
const VALUES = ['t', 'm2', 'b', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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

  const data1 = data.slice(0);
  const deck = data.concat(data1);

  const values = ['m4', 's1'];
  for (let i = 0; i < 4; i++) {
    values.map((value) => {
      deck.push(new Card('s', value));
    });
  }

  SUITS.map((suit) => {
    deck.push(new Card(suit, '0'));
  });

  return deck;
}
