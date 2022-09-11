const PlayerRepository = require('../../core/repository/player-repository');
const redis = require('../database/redis');

class PlayerRepositoryRedis extends PlayerRepository{
  async getPlayer(id) {
    const key = `player:${id}`;
    return await redis.hgetall(key);
  }

  async createPlayer(id, data) {
    const key = `player:${id}`;
    const result = await redis.hmset(key, {
      id,
      ...data
    });
    await redis.rpush('players', key);
    return result;
  }

  async deletePlayer(id) {
    const key = `player:${id}`;
    const result = await redis.del(key);
    await redis.lrem('players', 0, key);
    return result;
  }

  async getPlayersRoom(roomId) {
    const ids = await redis.lrange('players', 0, -1);
    const players = [];
    for(let i = 0; i < ids.length; i++) {
      const player = await redis.hgetall(ids[i]);
      if(player.roomId === roomId) players.push(player);
    }
    return players;
  }

  async getPlayersHumanRoom(roomId) {
    const ids = await redis.lrange('players', 0, -1);
    const players = [];
    for(let i = 0; i < ids.length; i++) {
      const player = await redis.hgetall(ids[i]);
      if(player.roomId === roomId && !player.isBot) players.push(player);
    }
    return players;
  }

  async getPlayersBotRoom(roomId) {
    const ids = await redis.lrange('players', 0, -1);
    const players = [];
    for(let i = 0; i < ids.length; i++) {
      const player = await redis.hgetall(ids[i]);
      if(player.roomId === roomId && player.isBot) players.push(player);
    }
    return players;
  }
  
  async updatePlayer(id, data) {
    const key = `player:${id}`;
    const current = await redis.hgetall(key);
    const result = await redis.hmset(key, {
      ...current,
      data
    });
    return result;
  }
}

module.exports = PlayerRepositoryRedis;
