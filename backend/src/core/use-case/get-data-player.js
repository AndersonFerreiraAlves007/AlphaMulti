class GetDataPlayer {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (playerId) {
    console.log(playerId);
    let result = {};
    try {
      console.log('askals 1');
      const player = await this.playerRepository.getPlayer(playerId);
      console.log('askals 2');
      if(player) {
        console.log('askals 3');
        result = {
          id: player.id,
          username: player.username,
          cards: player.cards.map(item => ({ color: item.color, value: item.value })),
          score: player.score,
          order: player.order,
          isBot: player.isBot,
          avatar: player.avatar
        };
        console.log('askals 4');
      } else {
        result = {};
      }
      console.log('askals 5');
      
    } catch(e) {
      console.log('askals 6');
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