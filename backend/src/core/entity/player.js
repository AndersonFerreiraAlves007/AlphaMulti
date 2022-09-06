class Player {
  constructor(id, username, score, cards, roomId) {
    this.id = id;
    this.username = username;
    this.score = score;
    this.cards = cards;
    this.roomId = roomId;
    this.order = -1;
  }

  setOrder(order) {
    this.order = order;
  }

  isWiner() {
    return this.cards.length === 0;
  }
}

module.exports = Player;
