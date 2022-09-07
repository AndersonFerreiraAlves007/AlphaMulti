const PlayerNotification = require('../../core/notification/player-notification');

class PlayerNotificationWS extends PlayerNotification {
  async startGame(roomId) {}

  async endGame(roomId) {}

  async enterPlayer(roomId) {}

  async levePlayer(roomId) {}

  async makeMove(roomId) {}
}

module.exports = PlayerNotificationWS;