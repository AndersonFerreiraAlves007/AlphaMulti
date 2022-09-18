class GetDataRoom {
  constructor (playerRepository, roomRepository) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
  }

  async execute (roomId) {
    let result = {};
    try {
      const room = await this.roomRepository.getRoom(roomId);
      if(room) {
        const players = await this.playerRepository.getPlayersRoom(room.id);
        const topCardsDiscarded = room.deck.getTopCardsDiscarded();
        return {
          id: room.id,
          createdAt: room.createdAt,
          startGameAt: room.startGameAt,
          startLastTurnAt: room.startLastTurnAt,
          direction: room.direction,
          isRun: room.isRun,
          type: room.type,
          name: room.name,
          code: room.code,
          topCard: {
            color: topCardsDiscarded ? topCardsDiscarded.color : '',
            value: topCardsDiscarded ? topCardsDiscarded.value : '',
          },
          positionActive: room.position,
          players: players.map(item => ({
            id: item.id,
            username: item.username,
            numberCards: item.cards.length,
            score: item.score,
            order: item.order,
            isBot: item.isBot,
            avatar: item.avatar
          })
          )
        };
      }
      result = {};
    } catch(e){
      result = {};
    }
    return result;
  }
}

module.exports = GetDataRoom;
/* room: {
  id, // id da sala
  createdAt, // obj de data idicado quanda a sala foi criada
  startGameAt, // obj de data indicando quado a sala inicial o jogo
  startLastTurnAt, //obj de data idicando quado iniciaou o turno atual
  direction, // setido do jogo; 1 setido horário; -1 sentido anti-horário
  isRun, // true se o jogo na sala iniciou e false caso não
  topCard: { // este obj idica a carta o topo da pilha de descarte
    color, // cor da carta do topo da pilha de descarte
    value, // valor da carta do topo da pilha de descarte
  },
  positionActive, //posicão ativa, referecia o campo order dos players, serve para econtrar o player que deve jogar
  players: [
    {
      id, //id do player
      username, //sem comentários
      numberCards, //úmero de cartas dos players
      score, //score do player, úmero inteiro
      order, // indica a posição de jogo o setido horário
      isBot // indica se esse usuário é um bot ou não
    }
  ]
} */