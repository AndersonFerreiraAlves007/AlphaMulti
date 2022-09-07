class Room {
  constructor(id, createdAt, startGameAt, startLastTurnAt, direction, isRun, deck) {
    this.id = id;
    this.createdAt = createdAt;
    this.startGameAt = startGameAt;
    this.startLastTurnAt = startLastTurnAt;
    this.direction = direction;
    this.isRun = isRun;
    this.deck = deck;
  }

  getScore(players) {
    const time = (new Date().getTime() - this.createdAt.getTime())/(1000 * 60);
    return time * 2 + players.length;
  }

}

module.exports = Room;
