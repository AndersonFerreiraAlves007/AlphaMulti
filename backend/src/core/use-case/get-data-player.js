class GetDataPlayer {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (idPlayer) {
    const player = await this.playerRepository.getPlayer(idPlayer);
    return {
      id: player.id,
      username: player.username,
      cards: player.cards,
      score: player.score,
      order: player.order,
      isBot: player.isBot
    };
  }
}

module.exports = GetDataPlayer;
