const {
  MAX_PLAYERS_ROOM
} = require('../utils/constants');

class Room {
  constructor(id, createdAt, startGameAt, startLastTurnAt, direction, isRun, deck, position) {
    this.id = id;
    this.createdAt = createdAt;
    this.startGameAt = startGameAt;
    this.startLastTurnAt = startLastTurnAt;
    this.direction = direction;
    this.isRun = isRun;
    this.deck = deck;
    this.position = position;
  }

  getScore(players) {
    const time = (new Date().getTime() - this.createdAt.getTime())/(1000 * 60);
    return time * 2 + players.length;
  }

  setNextPosition() {
    if(this.direction > 0) {
      if(this.position >= 1 && this.position < MAX_PLAYERS_ROOM) this.position += 1;
      else this.position = 1;
    } else {
      if(this.position > 1 && this.position <= MAX_PLAYERS_ROOM) this.position -= 1;
      else this.position = MAX_PLAYERS_ROOM;
    }
  }

}

module.exports = Room;
