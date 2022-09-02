const Deck = require('../entity/deck');
const minPlayers = 1;
const maxPlayers = 4;
const initialCards = 7;

class StartGaneTimeout {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (idRoom) {
    const deck = new Deck();
    const room = await this.roomRepository.getRoom(idRoom);
    const players = await this.playerRepository.getPlayersRoom(room.id);
    if(players.length !== maxPlayers) {
      if(players.length >= minPlayers) {
        await this.roomRepository.updateRoom();
        // setar a ordem
        players.forEach(item => {
          for(let i = 0; i < initialCards; i++) {
            item.push(deck.drawFromDeck());
          }
        });
        // save players
        // save room
        // criar bots
        this.playerNotification.startGame();
      } else {
        if(players.length === 0) {
          // delete bots
          await this.roomRepository.deleteRoom(room.id);
        }
      }
    }
  }
}

module.exports = StartGaneTimeout;
