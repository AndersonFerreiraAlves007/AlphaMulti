class PlayerRepository {
  async getPlayer(id) {}

  async createPlayerHuman(username) {}

  async createPlayerBot(username) {}

  async deletePlayer(id) {}

  async getPlayersRoom(idRoom) {}

  async getPlayersHumanRoom(idRoom) {}

  async getPlayersBotRoom(idRoom) {}
  
  async updatePlayer(id, data) {}
}

export {
  PlayerRepository
}
