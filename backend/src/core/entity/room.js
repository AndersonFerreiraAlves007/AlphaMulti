class Room {
  constructor(id, createdAt, startGameAt, startLastTurnAt, direction, isRun) {
    this.id = id;
    this.createdAt = createdAt;
    this.startGameAt = startGameAt;
    this.startLastTurnAt = startLastTurnAt;
    this.direction = direction;
    this.isRun = isRun;
  }

  getScore() {

  }

  getNumberPlayers() {

  }

  getNumberPlayersHumans() {
    
  }

  getJSON() {
    return {
      id: this.id,
      startDate: this.startDate,
      startLastTurn: this.startLastTurn,
      direction: this.direction,
    };
  }
}

module.exports = Room;
