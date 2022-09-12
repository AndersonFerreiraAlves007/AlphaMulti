const RoomRepository = require('../../core/repository/room-repository');
const redis = require('../database/redis');
const { v4 } = require('uuid');
const Room = require('../../core/entity/room');
const Card = require('../../core/entity/card');
const Deck = require('../../core/entity/deck');
const RoomAdapter = require('../../adapter/room-adapter');

class RoomRepositoryRedis extends RoomRepository {
  async getRoomAvaliables() {
    const ids = await redis.lrange('rooms', 0, -1);
    const rooms = [];
    for(let i = 0; i < ids.length; i++) {
      const room = await redis.hgetall(ids[i]);
      if(!room.isRun) rooms.push(room);
    }
    return rooms;
  }

  async getRoom(id) {
    const key = `room:${id}`;
    return await redis.hgetall(key);
  }

  async createRoom(data) {
    const id = v4();
    const key = `room:${id}`;
    const result = await redis.hmset(key, {
      id,
      ...data
    });
    await redis.rpush('rooms', key);
    return result;
  }

  async deleteRoom(id) {
    const key = `room:${id}`;
    const result = await redis.del(key);
    await redis.lrem('rooms', 0, key);
    return result;
  }

  async updateRoom(id, data) {
    const key = `room:${id}`;
    const current = await redis.hgetall(key);
    const result = await redis.hmset(key, {
      ...current,
      data
    });
    return result;
  }
}

module.exports = RoomRepositoryRedis;
