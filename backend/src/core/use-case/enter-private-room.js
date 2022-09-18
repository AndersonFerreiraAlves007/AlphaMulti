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
        console.log('etapa 1');
        const room = await this.roomRepository.getRoom(roomId);
        console.log('etapa 2');
        if(!room.isRun && room.type === ROOM_PRIVATE && room.password === password) {
          console.log('etapa 3');
          await this.playerRepository.updatePlayer(player.id, {
            roomId: room.id
          });
          console.log('etapa 4');
          const players = await this.playerRepository.getPlayersHumanRoom(room.id);
          console.log('etapa 5');
          this.playerNotification.enterPlayer(room.id, player.id);
          console.log('etapa 6');
          if(players.length === MAX_PLAYERS_ROOM) {
            console.log('etapa 7');
            console.log('etapa 8');
            room.deck.build();
            console.log('etapa 9');
            room.deck.shuffle();
            console.log('etapa 10');
            const cardInitial = room.deck.drawFromDeck();
            players.forEach((item, index) => {
              item.cards = [];
              for(let i = 0; i < INITIAL_CARDS_PLAYER; i++) {
                item.cards.push(room.deck.drawFromDeck());
              }
              item.order = index + 1;
            });
 
            console.log('etapa 11');
            if(cardInitial.color === COLOR_ESPECIAL) cardInitial.color = 'red';
            room.deck.discard(cardInitial);
            console.log('etapa 12');
            await this.roomRepository.updateRoom(room.id, {
              startGameAt: new Date().getTime(),
              startLastTurnAt: new Date().getTime(),
              direction: CLOCKWISE,
              isRun: true,
              position: 1,
              cards: room.deck.toStringCards(),
              cardsDiscarded: room.deck.toStringCardsDiscarded(),
            });
            console.log('etapa 13');
            for(let i = 0; i < players.length; i++) {
              console.log(players[i]);
              console.log(players[i].cards);
              await this.playerRepository.updatePlayer(players[i].id, {
                cards: players[i].toStringCards(), 
                order: players[i].order,
              });
            }
            console.log('etapa 14');
            this.playerNotification.startGame(room.id);
          } 
        }
      }
    }
  }
}

module.exports = EnterPrivateRoom;
