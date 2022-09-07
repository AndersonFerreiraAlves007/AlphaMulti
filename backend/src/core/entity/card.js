class Card {
  constructor(color, value) {
    this.color = color;
    this.value = value;
  }

  evaluateCard(openColor, openValue) {
    if(this.color === openColor) return true;
    if(this.value === openValue) return true;
    if(this.value === 'COR') return true;
    if(this.value === 'PL4') return true;
    return false;
  }
}

module.exports = Card;
