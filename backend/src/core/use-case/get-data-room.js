class GetDataRoom {
  constructor (playerRepository, roomRepository) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
  }

  async execute (idRoom) {
    const room = await this.roomRepository.getRoom(idRoom);
    const players = await this.playerRepository.getPlayersRoom(room.id);
    
  }
}

module.exports = GetDataRoom;
