class Player {
  constructor(id, username, isBot, score, cards, roomId, order) {
    this.id = id;
    this.username = username;
    this.isBot = isBot;
    this.score = score;
    this.cards = cards;
    this.roomId = roomId;
    this.order = order;
  }

  isWiner() {
    return this.cards.length === 0;
  }
}

module.exports = Player;
