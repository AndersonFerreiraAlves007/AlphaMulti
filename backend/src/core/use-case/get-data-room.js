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
