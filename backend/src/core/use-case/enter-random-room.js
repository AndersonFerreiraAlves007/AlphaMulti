const {
  MAX_PLAYERS_ROOM,
  INITIAL_CARDS_PLAYER,
  CLOCKWISE
} = require('../utils/constants');

class EnterRandomRoom {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (idPlayer) {
    let player = await this.playerRepository.getPlayer(idPlayer);
    const roomsAvaliables = await this.roomRepository.getRoomAvaliables();
    let room = null;
    if(roomsAvaliables.length > 0) {
      room = roomsAvaliables.sort((a, b) => b.getScore() - a.getScore())[0];
    } else {
      room = await this.roomRepository.createRoom();
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
    } 
  }
}

module.exports = EnterRandomRoom;
