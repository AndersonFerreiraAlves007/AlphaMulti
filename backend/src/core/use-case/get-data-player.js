class GetDataPlayer {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (idPlayer) {
    const player = await this.playerRepository.getPlayer(idPlayer);
    return player;
  }
}

module.exports = GetDataPlayer;
