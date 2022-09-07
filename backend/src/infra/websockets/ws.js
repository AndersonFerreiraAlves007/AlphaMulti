const WebSocket = require('ws');
const server = require('../http/express');

const wss = new WebSocket.Server({ server });

const clients = {};

wss.on('connection', ws => {
  ws.send(JSON.stringify({
    type: 'init',
    id: v4()
  }));
  ws.on('message', msg => {
    
  });
});
