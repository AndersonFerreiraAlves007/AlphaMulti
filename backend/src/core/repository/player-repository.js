class PlayerRepository {
  async getPlayer(id) {}

  async createPlayerHuman(data) {}

  async createPlayerBot() {}

  async deletePlayer(id) {}

  async getPlayersRoom(roomId) {}

  async getPlayersHumanRoom(roomId) {}

  async getPlayersBotRoom(roomId) {}
  
  async updatePlayer(id, data) {}
}

module.exports = PlayerRepository;
