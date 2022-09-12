const {
  MAX_PLAYERS_ROOM,
  INITIAL_CARDS_PLAYER,
  CLOCKWISE,
  COLOR_ESPECIAL
} = require('../utils/constants');

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
          room = await this.roomRepository.createRoom({
            createdAt: new Date(),
            startGameAt: null,
            startLastTurnAt: null,
            direction: 1,
            isRun: false,
            cards: '',
            position: 1,
            cardsDiscarded: '',
            amount: 0
          });
          this.timeNotification.createRoom(room.id);
        }
        await this.playerRepository.updatePlayer(player.id, {
          roomId: player.roomId
        });
        const players = await this.playerRepository.getPlayersHumanRoom(room.id);
        if(players.length === MAX_PLAYERS_ROOM) {
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
            cards: room.deck.toStringCards(),
            cardsDiscarded: room.deck.toStringCardsDiscarded(),
          });
      
          for(let i = 0; i < players.length; i++) {
            await this.playerRepository.updatePlayer(players[i].id, {
              cards: players[i].toStringCards(), 
              roomId: players[i].roomId,
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
