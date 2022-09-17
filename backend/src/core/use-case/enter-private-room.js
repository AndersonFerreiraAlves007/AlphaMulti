const {
  MAX_PLAYERS_ROOM,
  INITIAL_CARDS_PLAYER,
  CLOCKWISE,
  COLOR_ESPECIAL,
  ROOM_PRIVATE
} = require('../utils/constants');

class EnterPrivateRoom {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (playerId, roomId, password) {
    let player = await this.playerRepository.getPlayer(playerId);
    if(player) {
      if(!player.roomId) {

        const room = await this.roomRepository.getRoom(roomId);

        if(!room.isRun && room.type === ROOM_PRIVATE && room.password === password) {
          await this.playerRepository.updatePlayer(player.id, {
            roomId: room.id
          });
          const players = await this.playerRepository.getPlayersHumanRoom(room.id);
          this.playerNotification.enterPlayer(room.id);
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
}

module.exports = EnterPrivateRoom;