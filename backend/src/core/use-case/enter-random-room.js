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
      this.timeNotification.createRoom();
    }
    await this.playerRepository.updatePlayer(player.id, player.username, player.score, player.cards, player.roomId);
    const players = await this.playerRepository.getPlayersRoom(room.id);
    if(players.length === maxPlayers) {
      await this.roomRepository.updateRoom();
      // setar a ordem
      players.forEach(item => {
        for(let i = 0; i < initialCards; i++) {
          item.push(deck.drawFromDeck());
        }
      });
      // save players
      // save room
      this.playerNotification.startGame();
    } 
  }
}

module.exports = EnterRandomRoom;
