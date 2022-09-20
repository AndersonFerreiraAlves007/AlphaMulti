const Player = require('../core/entity/player');
const Card = require('../core/entity/card');

class PlayerAdapter {
  static create (data) {
    if(Object.values(data).length === 0) throw 'erro';
    const dataCards = data.cards === '' ? [] : data.cards.split(';');
    const cards = [];
    for(let i = 0; i < dataCards.length; i++) {
      const infoCard = dataCards[i].split(':');
      cards.push(new Card(infoCard[0], infoCard[1]));
    }
    return new Player(
      data.id, 
      data.username, 
      data.isBot === 'true', 
      Number(data.score), 
      cards, 
      data.roomId, 
      Number(data.order),
      data.avatar
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
    return {
      id: data.id, 
      username: data.username, 
      isBot: data.isBot === 'true', 
      score: Number(data.score), 
      cards, 
      roomId: data.roomId, 
      order: Number(data.order),
      avatar: data.avatar
    };
  }
}

module.exports = PlayerAdapter;