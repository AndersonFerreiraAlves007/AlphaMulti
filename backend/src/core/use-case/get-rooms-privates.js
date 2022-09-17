class GetDataRoom {
  constructor (playerRepository, roomRepository) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
  }

  async execute () {
    const rooms = await this.roomRepository.getRoomPrivateAvaliables();
    console.log(rooms);
    const dataRooms = [];

    for(let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      const players = await this.roomRepository.getPlayersRoom(room.id);
      dataRooms.push({
        id: room.id,
        code: room.code,
        name: room.name,
        isRun: room.isRun,
        createdAt: room.createdAt,
        numberPlayers: players.length
      });
    }

    return dataRooms;
  }
}

module.exports = GetDataRoom;
