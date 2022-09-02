const Deck = require('../entity/deck');

class PlayTurn {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (idPlayer, color, value) {
    
  }
}

module.exports = PlayTurn;
