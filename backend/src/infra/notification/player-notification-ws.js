const PlayerNotification = require('../../core/notification/player-notification');

class PlayerNotificationWS extends PlayerNotification {
  constructor(ws) {
    super();
    this.ws = ws;
  }
  
  async startGame(roomId) {
    this.ws.clients.forEach(client => {
      if(client.roonId === roomId) client.send({
        type: 'startGame'
      });
    });
  }

  async endGame(roomId) {
    this.ws.clients.forEach(client => {
      if(client.roonId === roomId) client.send({
        type: 'endGame'
      });
    });
  }

  async enterPlayer(roomId) {
    this.ws.clients.forEach(client => {
      if(client.roonId === roomId) client.send({
        type: 'enterPlayer'
      });
    });
  }

  async levePlayer(roomId) {
    this.ws.clients.forEach(client => {
      if(client.roonId === roomId) client.send({
        type: 'levePlayer'
      });
    });
  }

  async makeMove(roomId) {
    this.ws.clients.forEach(client => {
      if(client.roonId === roomId) client.send({
        type: 'makeMove'
      });
    });
  }
}

module.exports = PlayerNotificationWS;