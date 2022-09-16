const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { SERVER_PORT } = require('../../utils/constants');
const ExpressAdapter = require('../../adapter/express-adapter');
const GameController = require('../../controller/game-controller');
const PlayerAdapter = require('../../adapter/player-adapter');
const RoomAdapter = require('../../adapter/room-adapter');
const redis = require('../database/redis');

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.use(cookieParser());

app.get('/get-all-data-redis', async () => {
  const idsRooms = await redis.lrange('rooms', 0, -1);
  const rooms = [];
  for(let i = 0; i < idsRooms.length; i++) {
    const room = await redis.hgetall(idsRooms[i]);
    rooms.push(RoomAdapter.createJson(room));
  }
  
  const idsPlayers = await redis.lrange('players', 0, -1);
  const players = [];
  for(let i = 0; i < idsPlayers.length; i++) {
    const player = await redis.hgetall(idsPlayers[i]);
    players.push(PlayerAdapter.createJson(player));
  }
  
  return {
    rooms,
    players
  };
});

app.get('/get-data-player/:playerId', ExpressAdapter.create(GameController.getDataPlayer));

app.get('/get-data-room/:roomId', ExpressAdapter.create(GameController.getDataRoom));

app.get('/get-rooms-privates', ExpressAdapter.create(GameController.getRoomsPrivate));

app.post('/create-room-private', ExpressAdapter.create(GameController.createRoomPrivate));

const server = http.createServer(app);
 
server.listen(SERVER_PORT, err => { 
  if (err) { 
    console.log('Bem, isso não funcionou...'); 
    process.exit(); 
  } 
  console.log('O servidor está escutando porta ' + SERVER_PORT); 
  console.log(`http://localhost:${SERVER_PORT}`); 
}); 

module.exports = server;
