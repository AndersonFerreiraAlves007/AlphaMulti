class LeaveRoom {
  constructor (playerRepository, roomRepository, playerNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
  }

  async execute (idPlayer) {
    const player = await this.playerRepository.getPlayer(idPlayer);
    await this.playerRepository.updatePlayer(player.id, player.username, player.score, player.cards, '');
    const room = await this.roomRepository.getRoom(player.idRoom);
    const players = await this.playerRepository.getPlayersRoom(room.id);
    if(players.length === 0) {
      // delete bots
      await this.roomRepository.deleteRoom(room.id);
    } else {
      // create bot
      this.playerNotification.levePlayer();
    }
  }
}

module.exports = LeaveRoom;
