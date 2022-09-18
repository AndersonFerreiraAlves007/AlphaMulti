class GetDataPlayer {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (playerId) {
    let result = {};
    try {
      const player = await this.playerRepository.getPlayer(playerId);
      if(player) {
        result = {
          id: player.id,
          username: player.username,
          cards: player.cards.map(item => ({ color: item.color, value: item.value })),
          score: player.score,
          order: player.order,
          isBot: player.isBot,
          avatar: player.avatar
        };
      } else {
        result = {};
      }
    } catch(e) {
      result = {};
    }
    return result;
  }
}

module.exports = GetDataPlayer;
