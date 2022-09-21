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

  async sendMessagePlayer(roomId, type, payload = {}) {
    this.ws.clients.forEach(client => {
      if(payload.playerId === client.playerId) {
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

  async endGame(roomId, winer) {
    await this.sendMessageRoom(roomId, 'endGame', { winer });
  }

  async enterPlayer(roomId, playerId) {
    await this.sendMessageRoom(roomId, 'enterPlayer', { playerId });
  }

  async levePlayer(roomId, playerId, isLogout) {
    await this.sendMessageRoom(roomId, 'levePlayer', { playerId, isLogout });
    await this.sendMessagePlayer(roomId, 'levePlayer', { playerId, isLogout });
  }

  async makeMove(roomId) {
    await this.sendMessageRoom(roomId, 'makeMove');
  }
}

module.exports = PlayerNotificationWS;