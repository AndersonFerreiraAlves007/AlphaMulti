const {
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_RED,
  COLOR_YELLOW
} = require('./constants');

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function randomColor() {
  const colors = [COLOR_BLUE, COLOR_GREEN, COLOR_RED, COLOR_YELLOW];
  return colors[getRndInteger(0, colors.length)];
}

module.exports = {
  randomColor
};
