class GetDataRoom {
  constructor (playerRepository, roomRepository) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
  }

  async execute (roomId) {
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
        topCard: {
          color: topCardsDiscarded.color,
          value: topCardsDiscarded.value,
        },
        positionActive: room.position,
        players: players.map(item => ({
          id: item.id,
          username: item.username,
          numberCards: item.cards.length,
          score: item.score,
          order: item.order,
          isBot: item.isBot
        })
        )
      };
    }
    return null;
  }
}

module.exports = GetDataRoom;
