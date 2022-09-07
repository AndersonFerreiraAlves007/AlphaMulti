const PlayerRepository = require('../../core/repository/player-repository');

class PlayerRepositoryRedis extends PlayerRepository{
  async getPlayer(id) {}

  async createPlayerHuman(username) {}

  async createPlayerBot() {}

  async deletePlayer(id) {}

  async getPlayersRoom(roomId) {}

  async getPlayersHumanRoom(roomId) {}

  async getPlayersBotRoom(roomId) {}
  
  async updatePlayer(id, data) {}
}

module.exports = PlayerRepositoryRedis;
