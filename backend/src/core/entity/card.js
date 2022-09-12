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

  hasCard(openColor, openValue) {
    if(this.value === VALUE_JOCKER) return true;
    if(this.value === VALUE_M4) return true;
    if(this.color === openColor && this.value === openValue) return true;
    return false;
  }

  toString() {
    return `${this.color}:${this.value}`;
  }
}

module.exports = Card;
