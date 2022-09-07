const RoomRepository = require('../../core/repository/room-repository');

class RoomRepositoryRedis extends RoomRepository {
  async getRoomAvaliables() {}

  async getRoom(id) {}

  async createRoom() {}

  async deleteRoom(id) {}

  async updateRoom(id, data) {}
}

module.exports = RoomRepositoryRedis;
