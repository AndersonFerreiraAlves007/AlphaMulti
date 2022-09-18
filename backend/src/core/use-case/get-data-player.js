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
      }
      result = {};
    } catch(e) {
      /* await Promise.reject(new Error('test')); */
      result = {};
    }
    return result;
  }
}

module.exports = GetDataPlayer;
/* player = {
id, //uuid do player
username, // sen cometários
cards: [
  {
    color,
    value
  }
  ...
] // array coms as cartas da mão do player, vem o formato de array de objetos de cor e valor da carta
score, //iteiro maior que zero
order, // posição do jogador o jogo, tipo 2 para o segudo a jogar, isso cosiderado o sentido horario
isBot // true ou false
}
 */