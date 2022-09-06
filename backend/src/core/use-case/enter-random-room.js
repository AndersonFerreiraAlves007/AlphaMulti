const Deck = require('../entity/deck');
const maxPlayers = 4;
const initialCards = 7;

class EnterRandomRoom {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (idPlayer) {
    const deck = new Deck();
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
    const players = await this.playerRepository.getPlayersRoom(room.id);
    if(players.length === maxPlayers) {
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
    } 
  }
}

module.exports = EnterRandomRoom;
