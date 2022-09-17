const PlayerRepository = require('../../core/repository/player-repository');
const redis = require('../database/redis');

const PlayerAdapter = require('../../adapter/player-adapter');

class PlayerRepositoryRedis extends PlayerRepository{
  async getPlayer(id) {
    const key = `player:${id}`;
    const data = await redis.hgetall(key);
    return PlayerAdapter.create(data);
  }

  async createPlayer(id, data) {
    const key = `player:${id}`;
    await redis.hmset(key, {
      ...data,
      id
    });
    await redis.rpush('players', key);
    const result = await redis.hgetall(key);
    return PlayerAdapter.create(result);
  }

  async deletePlayer(id) {
    const key = `player:${id}`;
    const data = await redis.hgetall(key);
    await redis.del(key);
    await redis.lrem('players', 0, key);
    return PlayerAdapter.create(data);
  }

  async getPlayersRoom(roomId) {
    const ids = await redis.lrange('players', 0, -1);
    const players = [];
    for(let i = 0; i < ids.length; i++) {
      const player = await redis.hgetall(ids[i]);
      if(player.roomId === roomId) players.push(PlayerAdapter.create(player));
    }
    return players;
  }

  async getPlayersHumanRoom(roomId) {
    const ids = await redis.lrange('players', 0, -1);
    const players = [];
    for(let i = 0; i < ids.length; i++) {
      const player = await redis.hgetall(ids[i]);
      if(player.roomId === roomId && !player.isBot) players.push(PlayerAdapter.create(player));
    }
    return players;
  }

  async getPlayersBotRoom(roomId) {
    const ids = await redis.lrange('players', 0, -1);
    const players = [];
    for(let i = 0; i < ids.length; i++) {
      const player = await redis.hgetall(ids[i]);
      if(player.roomId === roomId && player.isBot) players.push(PlayerAdapter.create(player));
    }
    return players;
  }
  
  async updatePlayer(id, data) {
    const key = `player:${id}`;
    const current = await redis.hgetall(key);
    await redis.hmset(key, {
      ...current,
      ...data
    });
    const result = await redis.hgetall(key);
    return PlayerAdapter.create(result);
  }
}

module.exports = PlayerRepositoryRedis;
