const {
  MAX_PLAYERS_ROOM,
  INITIAL_CARDS_PLAYER,
  CLOCKWISE,
  COLOR_ESPECIAL,
  ROOM_PUBLIC
} = require('../utils/constants');
const {
  makeid
} = require('../utils/code');
const {
  randomColor
} = require('../utils/radomColor');
const {
  MINUTES_START_GAME
} = require('../../utils/constants');

class EnterRandomRoom {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (playerId) {
    let player = await this.playerRepository.getPlayer(playerId);
    if(player) {
      if(!player.roomId) {
        const roomsAvaliables = await this.roomRepository.getRoomAvaliables();
        let room = null;
        if(roomsAvaliables.length > 0) {
          room = roomsAvaliables.sort((a, b) => b.getScore() - a.getScore())[0];
        } else {
          const code = makeid(5);
          room = await this.roomRepository.createRoom({
            createdAt: new Date().getTime() + MINUTES_START_GAME * 1000 * 60,
            startGameAt: 0,
            startLastTurnAt: 0,
            direction: 1,
            isRun: false,
            cards: '',
            position: 1,
            cardsDiscarded: '',
            amount: 0,
            type: ROOM_PUBLIC,
            password: '',
            name: `Sala aleatória ${code}`,
            code
          });
          this.timeNotification.createRoom(room.id);
        }
        await this.playerRepository.updatePlayer(player.id, {
          roomId: room.id
        });
        const players = await this.playerRepository.getPlayersHumanRoom(room.id);
        this.playerNotification.enterPlayer(room.id, player.id);
        if(players.length === MAX_PLAYERS_ROOM) {
          room.deck.build();
          room.deck.shuffle();
          const cardInitial = room.deck.drawFromDeck();
          
          players.forEach((item, index) => {
            item.cards = [];
            for(let i = 0; i < INITIAL_CARDS_PLAYER; i++) {
              item.cards.push(room.deck.drawFromDeck());
            }
            item.order = index + 1;
          });

        
          if(cardInitial.color === COLOR_ESPECIAL) cardInitial.color = randomColor();
          room.deck.discard(cardInitial);

          await this.roomRepository.updateRoom(room.id, {
            startGameAt: new Date().getTime(),
            startLastTurnAt: new Date().getTime(),
            direction: CLOCKWISE,
            isRun: true,
            position: 1,
            cards: room.deck.toStringCards(),
            cardsDiscarded: room.deck.toStringCardsDiscarded(),
          });
      
          for(let i = 0; i < players.length; i++) {
            await this.playerRepository.updatePlayer(players[i].id, {
              cards: players[i].toStringCards(), 
              order: players[i].order,
            });
          }

          this.playerNotification.startGame(room.id);
        } 
      }
    }
  }
}

module.exports = EnterRandomRoom;
