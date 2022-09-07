class Logout {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (idPlayer) {
    const player = await this.playerRepository.getPlayer(idPlayer);
    if(player.roomId) {
      const cards = player.cards;
      await this.playerRepository.updatePlayer(player.id, {
        cards: [], 
        roomId: ''
      });
      const room = await this.roomRepository.getRoom(player.roomId);
      const players = await this.playerRepository.getPlayersHumanRoom(room.id);
      if(players.length === 0) {
        const bots = await this.playerRepository.getPlayersBotRoom(room.id);
        for(let i = 0; i < bots.length; i++) {
          await this.playerRepository.deletePlayer(bots[i].id);
        }
        await this.roomRepository.deleteRoom(room.id);
      } else {
        if(room.isRun) {
          const bot = await this.playerRepository.createPlayerBot();
          await this.playerRepository.updatePlayer(bot.id, {
            cards: cards, 
            roomId: room.id,
            order: player.order
          });
        }
        this.playerNotification.levePlayer(room.id);
      }
    }
    await this.playerRepository.deletePlayer(idPlayer);
  }
}

module.exports = Logout;
