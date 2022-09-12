const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { SERVER_PORT } = require('./utils/constants');
const ExpressAdapter = require('../../adapter/express-adapter');
const GameController = require('../../controller/game-controller');

const app = express();

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));
app.use(cookieParser());

app.get('/get-data-player/:playerId', ExpressAdapter.create(GameController.getDataPlayer));

app.get('/get-data-room/:roomId', ExpressAdapter.create(GameController.getDataRoom));

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
