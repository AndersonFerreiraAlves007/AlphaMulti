const {
  MAX_PLAYERS_ROOM
} = require('../utils/constants');

class Room {
  constructor(
    id, 
    createdAt, 
    startGameAt, 
    startLastTurnAt, 
    direction, 
    isRun, 
    deck, 
    position, 
    amount, 
    type = 'public', 
    password = '',
    name = '', 
    code = '',
    turn
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.startGameAt = startGameAt;
    this.startLastTurnAt = startLastTurnAt;
    this.direction = direction;
    this.isRun = isRun;
    this.deck = deck;
    this.position = position;
    this.amount = amount;
    this.type = type;
    this.password = password;
    this.name = name;
    this.code = code;
    this.turn = turn;
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
