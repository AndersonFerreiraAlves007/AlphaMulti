const {
  MAX_PLAYERS_ROOM,
  INITIAL_CARDS_PLAYER,
  MIN_PLAYERS_ROOM,
  CLOCKWISE,
  COLOR_ESPECIAL
} = require('../utils/constants');
const { v4 } = require('uuid');
const {
  MINUTES_PLAY_TURN
} = require('../../utils/constants');

class StartGaneTimeout {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (roomId) {
    console.log('StartGaneTimeout 1.1');
    const room = await this.roomRepository.getRoom(roomId);
    console.log('StartGaneTimeout 1');
    if(room) {
      console.log('StartGaneTimeout 2');
      if(!room.isRun) {
        console.log('StartGaneTimeout 3');
        const playersHumans = await this.playerRepository.getPlayersHumanRoom(room.id);
        console.log('StartGaneTimeout 4');
        if(playersHumans.length !== MAX_PLAYERS_ROOM) {
          console.log('StartGaneTimeout 5');
          if(playersHumans.length >= MIN_PLAYERS_ROOM) {
            console.log('StartGaneTimeout 6');
            for(let i = 0; i < MAX_PLAYERS_ROOM - playersHumans.length; i++) {
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
                cards: '', 
                roomId: room.id,
                order: -1
              });
            }
            console.log('StartGaneTimeout 7');
            const players = await this.playerRepository.getPlayersRoom(room.id);
            console.log('StartGaneTimeout 1');
            room.deck.build();
            room.deck.shuffle();
            const cardInitial = room.deck.drawFromDeck();
            console.log('StartGaneTimeout 8');
            players.forEach((item, index) => {
              item.cards = [];
              for(let i = 0; i < INITIAL_CARDS_PLAYER; i++) {
                item.cards.push(room.deck.drawFromDeck());
              }
              item.order = index + 1;
            });
            console.log('StartGaneTimeout 9');
            
            if(cardInitial.color === COLOR_ESPECIAL) cardInitial.color = 'red';
            room.deck.discard(cardInitial);
            console.log('StartGaneTimeout 10');
            await this.roomRepository.updateRoom(room.id, {
              startGameAt: new Date().getTime(),
              startLastTurnAt: new Date().getTime() + MINUTES_PLAY_TURN * 60 * 1000,
              direction: CLOCKWISE,
              isRun: true,
              position: 1,
              cards: room.deck.toStringCards(),
              cardsDiscarded: room.deck.toStringCardsDiscarded(),
            });
            console.log('StartGaneTimeout 11');
            for(let i = 0; i < players.length; i++) {
              await this.playerRepository.updatePlayer(players[i].id, {
                cards: players[i].toStringCards(), 
                order: players[i].order,
              });
            }
            console.log('StartGaneTimeout 12');
            this.playerNotification.startGame(room.id);
          } else {
            if(playersHumans.length === 0) {
              const bots = await this.playerRepository.getPlayersBotRoom(room.id);
              for(let i = 0; i < bots.length; i++) {
                await this.playerRepository.deletePlayer(bots[i].id);
              }
              await this.roomRepository.deleteRoom(room.id);
            }
            console.log('StartGaneTimeout 13');
          }
        }
      }
    }
  }
}

module.exports = StartGaneTimeout;
