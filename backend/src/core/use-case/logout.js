class Logout {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (idPlayer) {
    const player = await this.playerRepository.getPlayer(idPlayer);
    await this.playerRepository.updatePlayer(player.id, {
      cards: [], 
      roomId: ''
    });
    const cards = player.cards;
    const room = await this.roomRepository.getRoom(player.idRoom);
    const players = await this.playerRepository.getPlayersHumanRoom(room.id);
    if(players.length === 0) {
      const bots = await this.playerRepository.getPlayersBotRoom(room.id);
      for(let i = 0; i < bots.length; i++) {
        await this.playerRepository.deletePlayer(player.id);
      }
      await this.roomRepository.deleteRoom(room.id);
    } else {
      if(room.isRun) {
        const bot = await this.playerRepository.createPlayerBot();
        await this.playerRepository.updatePlayer(bot.id, {
          cards: cards, 
          roomId: room.id
        });
      }
      await this.playerRepository.deletePlayer(idPlayer);
      this.playerNotification.levePlayer(room.id);
    }
  }
}

module.exports = Logout;
