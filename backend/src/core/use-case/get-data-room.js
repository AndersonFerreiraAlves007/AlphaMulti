class GetDataRoom {
  constructor (playerRepository, roomRepository) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
  }

  async execute (idRoom) {
    const room = await this.roomRepository.getRoom(idRoom);
    const players = await this.playerRepository.getPlayersRoom(room.id);
    const topCardsDiscarded = room.deck.getTopCardsDiscarded();
    return {
      id: room.isRun,
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
}

module.exports = GetDataRoom;
