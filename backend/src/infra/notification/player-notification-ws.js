const PlayerNotification = require('../../core/notification/player-notification');
const redis = require('../database/redis');

async function getIdsPlayersRooms(roomId) {
  const ids = await redis.lrange('players', 0, -1);
  const idsPlayersRooms = [];
  for(let i = 0; i < ids.length; i++) {
    const player = await redis.hgetall(ids[i]);
    if(player.roomId === roomId) idsPlayersRooms.push(player.id);
  }
  return idsPlayersRooms;
}

class PlayerNotificationWS extends PlayerNotification {
  constructor(ws) {
    super();
    this.ws = ws;
  }

  async sendMessageRoom(roomId, type, payload = {}) {
    const players = await getIdsPlayersRooms(roomId);
    this.ws.clients.forEach(client => {
      if(players.includes(client.playerId)) {
        client.send(JSON.stringify({
          type,
          payload: {
            roomId,
            ...payload
          }
        }));
      }
    });
  }
  
  async startGame(roomId) {
    await this.sendMessageRoom(roomId, 'startGame');
  }

  async endGame(roomId) {
    await this.sendMessageRoom(roomId, 'endGame');
  }

  async enterPlayer(roomId, playerId) {
    await this.sendMessageRoom(roomId, 'enterPlayer');
  }

  async levePlayer(roomId) {
    console.log('levePlayer(roomId)');
    await this.sendMessageRoom(roomId, 'levePlayer');
  }

  async makeMove(roomId, winer) {
    await this.sendMessageRoom(roomId, 'makeMove', { winer });
  }
}

module.exports = PlayerNotificationWS;