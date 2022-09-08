const {
  MAX_PLAYERS_ROOM,
  INITIAL_CARDS_PLAYER,
  MIN_PLAYERS_ROOM,
  CLOCKWISE,
  COLOR_ESPECIAL
} = require('../utils/constants');

class StartGaneTimeout {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (roomId) {
    const room = await this.roomRepository.getRoom(roomId);
    if(room) {
      if(!room.isRun) {
        const playersHumans = await this.playerRepository.getPlayersHumanRoom(room.id);
        if(playersHumans.length !== MAX_PLAYERS_ROOM) {
          if(playersHumans.length >= MIN_PLAYERS_ROOM) {

            for(let i = 0; i < MAX_PLAYERS_ROOM - playersHumans.length; i++) {
              const bot = await this.playerRepository.createPlayerBot({
                username: 'Bot',
                score: 0
              });
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
            const cardInitial = room.deck.drawFromDeck();
            if(cardInitial.color === COLOR_ESPECIAL) cardInitial.color = 'red';
            room.deck.discard(cardInitial);

            await this.roomRepository.updateRoom(room.id, {
              startGameAt: new Date(),
              startLastTurnAt: new Date(),
              direction: CLOCKWISE,
              isRun: true,
              position: 1,
              cards: room.deck.cards.map(item => ({ color: item.color, value: item.value })),
              cardsDiscarded: room.deck.cardsDiscarded.map(item => ({ color: item.color, value: item.value })),
            });
          
            for(let i = 0; i < players.length; i++) {
              await this.playerRepository.updatePlayer(players[i].id, {
                cards: players[i].cards.map(item => ({ color: item.color, value: item.value })), 
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
}

module.exports = StartGaneTimeout;
