const Room = require('../core/entity/room');
const Card = require('../core/entity/card');
const Deck = require('../core/entity/deck');

class RoomAdapter {
  static create (data) {
    const dataCards = data.cards.split(';');
    const cards = [];

    for(let i = 0; i < dataCards.length; i++) {
      const infoCard = dataCards[i].split(':');
      cards.push(new Card(infoCard[0], infoCard[1]));
    }

    const dataCardsDiscarded = data.cards.split(';');
    const cardsDiscarded = [];
    for(let i = 0; i < dataCardsDiscarded.length; i++) {
      const infoCard = dataCardsDiscarded[i].split(':');
      cardsDiscarded.push(new Card(infoCard[0], infoCard[1]));
    }

    const deck = new Deck();
    deck.cards = cards;
    deck.cardsDiscarded = cardsDiscarded;

    return Room(
      data.id,
      data.createdAt === 0 ? null : new Date().setTime(data.createdAt),
      data.startGameAt === 0 ? null : new Date().setTime(data.startGameAt),
      data.startLastTurnAt === 0 ? null : new Date().setTime(data.startLastTurnAt),
      data.direction,
      data.isRun,
      deck,
      data.position,
      data.amount,
      data.type,
      data.password,
      data.name,
      data.code
    );
  }

  static createJson (data) {
    const dataCards = data.cards.split(';');
    const cards = [];

    for(let i = 0; i < dataCards.length; i++) {
      const infoCard = dataCards[i].split(':');
      cards.push({
        color: infoCard[0], 
        value: infoCard[1]
      });
    }

    const dataCardsDiscarded = data.cards.split(';');
    const cardsDiscarded = [];
    for(let i = 0; i < dataCardsDiscarded.length; i++) {
      const infoCard = dataCardsDiscarded[i].split(':');
      cardsDiscarded.push({
        color: infoCard[0], 
        value: infoCard[1]
      });
    }

    return {
      id: data.id,
      createdAt: data.createdAt === 0 ? null : new Date().setTime(data.createdAt),
      startGameAt: data.startGameAt === 0 ? null : new Date().setTime(data.startGameAt),
      startLastTurnAt: data.startLastTurnAt === 0 ? null : new Date().setTime(data.startLastTurnAt),
      direction: data.direction,
      isRun: data.isRun,
      position: data.position,
      amount: data.amount,
      type: data.type,
      password: data.password,
      name: data.name,
      code: data.code,
      cards,
      cardsDiscarded
    };
  }
}

module.exports = RoomAdapter;