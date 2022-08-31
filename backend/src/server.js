require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const WebSocket = require('ws');
const http = require('http');
const { v4 } = require('uuid');
const Redis = require('ioredis'); 
const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, SERVER_PORT } = require('./utils/constants');

const port = SERVER_PORT;
 
const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: 'ola o dm uno ta vivo'
  });
});

const redis = new Redis({
  port: REDIS_PORT, // Redis port
  host: REDIS_HOST, // Redis host
  password: REDIS_PASSWORD
});

const redisGet = (key) => new Promise((resolve, reject) => 
  redis.get(key, (err, value) => err ? reject(err) : resolve(value))
);

const server = http.createServer(app);
 
server.listen(port, err => { 
  if (err) { 
    console.log('Bem, isso não funcionou...'); 
    process.exit(); 
  } 
  console.log('O servidor está escutando porta ' + port); 
  console.log(`http://localhost:${port}`); 
}); 

/* const wss = new WebSocket.Server({ server });

const clients = {};

function getDataClients() {
  const dados = Object.values(clients);
  return dados.map(item => ({
    username: item.username,
    id: item.id
  }));
}

wss.on('connection', ws => {
  ws.send(JSON.stringify({
    type: 'init',
    id: v4()
  }));
  ws.on('message', msg => {
    const dados = JSON.parse(msg);
    switch (dados.type) {
    case 'init':
      clients[dados.id] = {
        username: dados.username,
        id: dados.id,
        ws: ws
      };
      Object.values(clients).forEach(function each(client) {
        client.ws.send( JSON.stringify({
          type: 'new_user',
          id: dados.id,
          username: dados.username,
          users: getDataClients()
        }));
      });
      break;
    case 'public':
      Object.values(clients).forEach(function each(client) {
        client.ws.send(msg);
      });
      break;
    case 'private':
      clients[dados.canal].ws.send(msg);
      clients[dados.id].ws.send(msg);
      break;
    }
  });
});
 */
