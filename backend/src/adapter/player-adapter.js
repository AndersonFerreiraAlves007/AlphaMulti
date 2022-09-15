const Player = require('../core/entity/player');
const Card = require('../../core/entity/card');

class PlayerAdapter {
  static create (data) {
    const dataCards = data.cards.split(';');
    const cards = [];
    for(let i = 0; i < dataCards.length; i++) {
      const infoCard = dataCards[i].split(':');
      cards.push(new Card(infoCard[0], infoCard[1]));
    }
    return Player(
      data.id, 
      data.userame, 
      data.isBot, 
      data.score, 
      cards, 
      data.roomId, 
      data.order,
      data.avatar
    );
  }
}

module.exports = PlayerAdapter;