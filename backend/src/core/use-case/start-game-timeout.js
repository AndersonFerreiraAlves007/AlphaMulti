const Deck = require('../entity/deck');
const minPlayers = 1;
const maxPlayers = 4;
const initialCards = 7;

class StartGaneTimeout {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (idRoom) {
    const deck = new Deck();
    const room = await this.roomRepository.getRoom(idRoom);
    const playersHumans = await this.playerRepository.getPlayersHumanRoom(room.id);
    if(!room.isRun) {
      if(playersHumans.length !== maxPlayers) {
        if(playersHumans.length >= minPlayers) {

          for(let i = 0; i < maxPlayers - playersHumans.length; i++) {
            const bot = await this.playerRepository.createPlayerBot();
            await this.playerRepository.updatePlayer(bot.id, {
              cards: [], 
              roomId: room.id,
              order: -1
            });
          }

          const players = await this.playerRepository.getPlayersRoom(room.id);
          
          players.forEach((item, index) => {
            for(let i = 0; i < initialCards; i++) {
              item.push(deck.drawFromDeck());
            }
            item.setOrder(index + 1);
          });

          await this.roomRepository.updateRoom(room.id, {
            startGameAt: new Date(),
            startLastTurnAt: new Date(),
            isRun: true
          });
          
          for(let i = 0; i < players.length; i++) {
            await this.playerRepository.updatePlayer(players[i].id, {
              cards: players[i].cards, 
              roomId: players[i].roomId,
              order: players[i].order,
            });
          }

          this.playerNotification.startGame(room.id);
        } else {
          if(playersHumans.length === 0) {
            const bots = await this.playerRepository.getPlayersBotRoom(room.id);
            for(let i = 0; i < bots.length; i++) {
              await this.playerRepository.deletePlayer(bots[i].id);
            }
            await this.roomRepository.deleteRoom(room.id);
          }
        }
      }
    }
  }
}

module.exports = StartGaneTimeout;
