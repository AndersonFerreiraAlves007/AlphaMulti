const Room = require('../core/entity/room');
const Card = require('../core/entity/card');
const Deck = require('../core/entity/deck');

class RoomAdapter {
  static create (data) {
    if(Object.values(data).length === 0) throw 'erro';
    const dataCards = data.cards === '' ? [] : data.cards.split(';');
    const cards = [];

    for(let i = 0; i < dataCards.length; i++) {
      const infoCard = dataCards[i].split(':');
      cards.push(new Card(infoCard[0], infoCard[1]));
    }

    const dataCardsDiscarded = data.cards === '' ? [] : data.cardsDiscarded.split(';');
    const cardsDiscarded = [];
    for(let i = 0; i < dataCardsDiscarded.length; i++) {
      const infoCard = dataCardsDiscarded[i].split(':');
      cardsDiscarded.push(new Card(infoCard[0], infoCard[1]));
    }

    const deck = new Deck();
    deck.cards = cards;
    deck.cardsDiscarded = cardsDiscarded;

    return new Room(
      data.id,
      Number(data.createdAt) === 0 ? null : new Date().setTime(data.createdAt),
      Number(data.startGameAt) === 0 ? null : new Date().setTime(data.startGameAt),
      Number(data.startLastTurnAt) === 0 ? null : new Date().setTime(data.startLastTurnAt),
      Number(data.direction),
      data.isRun === 'true',
      deck,
      Number(data.position),
      Number(data.amount),
      data.type,
      data.password,
      data.name,
      data.code,
      Number(data.turn)
    );
  }

  static createJson (data) {
    if(Object.values(data).length === 0) throw 'erro';
    const dataCards = data.cards === '' ? [] : data.cards.split(';');
    const cards = [];

    for(let i = 0; i < dataCards.length; i++) {
      const infoCard = dataCards[i].split(':');
      cards.push({
        color: infoCard[0], 
        value: infoCard[1]
      });
    }

    const dataCardsDiscarded = data.cardsDiscarded === '' ? [] : data.cardsDiscarded.split(';');
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
      createdAt: Number(data.createdAt) === 0 ? null : new Date().setTime(data.createdAt),
      startGameAt: Number(data.startGameAt) === 0 ? null : new Date().setTime(data.startGameAt),
      startLastTurnAt: Number(data.startLastTurnAt) === 0 ? null : new Date().setTime(data.startLastTurnAt),
      direction:  Number(data.direction),
      isRun: data.isRun === 'true',
      position: Number(data.position),
      amount: Number(data.amount),
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