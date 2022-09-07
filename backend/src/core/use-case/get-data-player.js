class GetDataPlayer {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (idPlayer) {
    const player = await this.playerRepository.getPlayer(idPlayer);
    if(player) {
      return {
        id: player.id,
        username: player.username,
        cards: player.cards.map(item => ({ color: item.color, value: item.value })),
        score: player.score,
        order: player.order,
        isBot: player.isBot
      };
    }
    return null;
  }
}

module.exports = GetDataPlayer;
