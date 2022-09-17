const { v4 } = require('uuid');
const WebSocket = require('ws');
const server = require('../http/express');
const GameController = require('../../controller/game-controller');
const GlobalData = require('../data/global');

const ws = new WebSocket.Server({ server });

function heartbeat() {
  this.isAlive = true;
}

ws.on('connection', client => {
  client.playerId = v4();
  client.isAlive = true;
  client.send(JSON.stringify({
    type: 'init',
    playerId: v4()
  }));
  client.on('pong', heartbeat);
  client.on('message', data => {
    const { type, payload } = JSON.parse(data);
    switch (type) {
    case 'login':
      GameController.login({}, {
        playerId: payload.id,
        username: payload.username,
        avatar: payload.avatar
      });
      break;
    case 'enterRandomRoom':
      GameController.enterRandomRoom({
        playerId: payload.playerId,
      }, {});
      break;
    case 'leaveRoom':
      GameController.leaveRoom({
        playerId: payload.id,
      }, {});
      break;
    case 'logout':
      GameController.logout({
        playerId: payload.id,
      }, {});
      break;
    case 'playTurn':
      GameController.playTurn({
        playerId: payload.id,
        color: payload.color,
        value: payload.value
      }, {});
      break;
    case 'enterPrivateRoom':
      GameController.enterRandomRoom({
        playerId: payload.id,
        roomId: payload.roomId,
        password: payload.password,
      }, {});
      break;
    default:
      break;
    }
  });
});

const interval = setInterval(function ping() {
  ws.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
      GameController.logout(ws.playerId);
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

ws.on('close', function close() {
  clearInterval(interval);
});

GlobalData.ws = ws;

module.exports = {
  ws
};