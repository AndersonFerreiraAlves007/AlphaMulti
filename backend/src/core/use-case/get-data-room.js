class GetDataRoom {
  constructor (playerRepository, roomRepository) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
  }

  async execute (idRoom) {
    const room = await this.roomRepository.getRoom(idRoom);
    const players = await this.playerRepository.getPlayersRoom(room.id);
    return {
      id: room.isRun,
      createdAt: this.createdAt,
      startGameAt: this.startGameAt,
      startLastTurnAt: this.startLastTurnAt,
      direction: this.direction,
      isRun: this.isRun,
      topCard: {

      },
      playerActive: ,
      players: players.map(item => {
        return {
          id: item.id,
          numberCards: item.cards.length
        };
      })
    };
  }
}

module.exports = GetDataRoom;
