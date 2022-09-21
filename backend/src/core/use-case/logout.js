const { v4 } = require('uuid');

class Logout {
  constructor (playerRepository, roomRepository, playerNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
  }

  async execute (playerId) {
    try {
      const player = await this.playerRepository.getPlayer(playerId);
      if(player) {
        if(player.roomId) {
          await this.playerRepository.updatePlayer(player.id, {
            cards: '', 
            roomId: '',
            order: -1
          });
          const room = await this.roomRepository.getRoom(player.roomId);
          const players = await this.playerRepository.getPlayersHumanRoom(room.id);
          await this.playerRepository.deletePlayer(playerId);
          if(players.length === 0) {
            const bots = await this.playerRepository.getPlayersBotRoom(room.id);
            for(let i = 0; i < bots.length; i++) {
              await this.playerRepository.deletePlayer(bots[i].id);
            }
            await this.roomRepository.deleteRoom(room.id);
          } else {
            if(room.isRun) {
              const bot = await this.playerRepository.createPlayer(v4(), {
                username: 'Bot',
                isBot: true,
                score: 0,
                cards: '',
                roomId: '',
                order: -1,
                avatar: './src/assets/img/users/user-robo-1.svg'
              });
              await this.playerRepository.updatePlayer(bot.id, {
                cards: player.toStringCards(), 
                roomId: room.id,
                order: player.order
              });
            }
            this.playerNotification.levePlayer(room.id, player.id, true);
          }
        } else {
          await this.playerRepository.deletePlayer(playerId);
        }
      
      }
    } catch(e) {
      console.log('lalala');
    }
  }
}

module.exports = Logout;
