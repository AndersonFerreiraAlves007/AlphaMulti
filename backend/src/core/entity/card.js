const {
  VALUE_M4,
  VALUE_JOCKER
} = require('../utils/constants');

class Card {
  constructor(color, value) {
    this.color = color;
    this.value = value;
  }

  evaluateCard(openColor, openValue) {
    if(this.color === openColor) return true;
    if(this.value === openValue) return true;
    if(this.value === VALUE_JOCKER) return true;
    if(this.value === VALUE_M4) return true;
    return false;
  }
}

module.exports = Card;
