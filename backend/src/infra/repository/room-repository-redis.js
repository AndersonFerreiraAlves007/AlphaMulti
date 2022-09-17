const RoomRepository = require('../../core/repository/room-repository');
const redis = require('../database/redis');
const { v4 } = require('uuid');
const RoomAdapter = require('../../adapter/room-adapter');
const { ROOM_PUBLIC, ROOM_PRIVATE } = require('../../core/utils/constants');

class RoomRepositoryRedis extends RoomRepository {
  async getRoomAvaliables() {
    const ids = await redis.lrange('rooms', 0, -1);
    const rooms = [];
    for(let i = 0; i < ids.length; i++) {
      const room = await redis.hgetall(ids[i]);

      if(!room.isRun && room.type === ROOM_PUBLIC) rooms.push(RoomAdapter.create(room));
    }
    return rooms;
  }

  async getRoomPrivateAvaliables() {
    const ids = await redis.lrange('rooms', 0, -1);
    const rooms = [];
    console.log('getRoomPrivateAvaliables', ids);
    for(let i = 0; i < ids.length; i++) {
      const room = await redis.hgetall(ids[i]);
      console.log('getRoomPrivateAvaliables2', room);
      if(!room.isRun && room.type === ROOM_PRIVATE) rooms.push(RoomAdapter.create(room));
    }
    return rooms;
  }

  async getRoom(id) {
    const key = `room:${id}`;
    const result = await redis.hgetall(key);
    return RoomAdapter.create(result);
  }

  async createRoom(data) {
    const id = v4();
    const key = `room:${id}`;
    await redis.hmset(key, {
      ...data,
      id,
    });
    await redis.rpush('rooms', key);
    const result = await redis.hgetall(key);
    return RoomAdapter.create(result);
  }

  async deleteRoom(id) {
    const key = `room:${id}`;
    const result = await redis.hgetall(key);
    await redis.del(key);
    await redis.lrem('rooms', 0, key);
    return RoomAdapter.create(result);
  }

  async updateRoom(id, data) {
    const key = `room:${id}`;
    const current = await redis.hgetall(key);
    await redis.hmset(key, {
      ...current,
      ...data
    });
    const result = await redis.hgetall(key);
    return RoomAdapter.create(result);
  }
}

module.exports = RoomRepositoryRedis;
