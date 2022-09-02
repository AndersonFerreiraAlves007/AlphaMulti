class Player {
  constructor(id, username, score, cards, roomId) {
    this.id = id;
    this.username = username;
    this.score = score;
    this.cards = cards;
    this.roomId = roomId;
  }
}

module.exports = Player;
