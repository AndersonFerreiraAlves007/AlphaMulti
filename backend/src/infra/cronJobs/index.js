const GameController = require('../../controller/game-controller');
const redis = require('../database/redis');

setInterval(async () => {
  const tasks = await redis.lrange('works_cron', 0, -1);
  for(let i = 0; i < tasks.length; i++) {
    const data = JSON.parse(tasks[i]);
    if(data.expiresIn < new Date().getTime()) {
      switch (data.type) {
      case 'createRoom':
        GameController.startGameTimeout(data.roomId);
        break;
      case 'makeMove':
        GameController.playTurnTimeout(data.roomId, data.position);
        break;
      }
      await redis.lrem('works_cron', 0, tasks[i]);
    }
  }
}, 5000); 
