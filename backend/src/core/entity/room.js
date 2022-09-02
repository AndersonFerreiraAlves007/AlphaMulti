class Room {
  constructor(id, startDate, startLastTurn, direction) {
    this.id = id;
    this.startDate = startDate;
    this.startLastTurn = startLastTurn;
    this.direction = direction;
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
