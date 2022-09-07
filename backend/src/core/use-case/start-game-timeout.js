const {
  MAX_PLAYERS_ROOM,
  INITIAL_CARDS_PLAYER,
  MIN_PLAYERS_ROOM,
  CLOCKWISE
} = require('../utils/constants');

class StartGaneTimeout {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (idRoom) {
    const room = await this.roomRepository.getRoom(idRoom);
    if(!room.isRun) {
      const playersHumans = await this.playerRepository.getPlayersHumanRoom(room.id);
      if(playersHumans.length !== MAX_PLAYERS_ROOM) {
        if(playersHumans.length >= MIN_PLAYERS_ROOM) {

          for(let i = 0; i < MAX_PLAYERS_ROOM - playersHumans.length; i++) {
            const bot = await this.playerRepository.createPlayerBot();
            await this.playerRepository.updatePlayer(bot.id, {
              cards: [], 
              roomId: room.id,
              order: -1
            });
          }

          const players = await this.playerRepository.getPlayersRoom(room.id);
          
          players.forEach((item, index) => {
            item.cards = [];
            for(let i = 0; i < INITIAL_CARDS_PLAYER; i++) {
              item.cards.push(room.deck.drawFromDeck());
            }
            item.order = index + 1;
          });

          room.deck.build();
          room.deck.shuffle();
          room.deck.discard(room.deck.drawFromDeck());

          await this.roomRepository.updateRoom(room.id, {
            startGameAt: new Date(),
            startLastTurnAt: new Date(),
            direction: CLOCKWISE,
            isRun: true,
            position: 1,

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
