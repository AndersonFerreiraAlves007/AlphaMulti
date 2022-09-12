const TimeNotification = require('../../core/notification/time-notification');
const redis = require('../database/redis');
const { MINUTES_START_GAME, MINUTES_PLAY_TURN } = require('../../utils/constants');

class TimeNotificationWs extends TimeNotification {
  async createRoom(roomId) {
    const data = JSON.stringify({
      type: 'createRoom',
      data: {
        roomId,
        expiresIn: new Date().getTime() + MINUTES_START_GAME * 1000 * 60
      }
    });
    await redis.rpush('works_cron', data);
  }

  async makeMove(roomId, position) {
    const data = JSON.stringify({
      type: 'makeMove',
      data: {
        roomId,
        position,
        expiresIn: new Date().getTime() + MINUTES_PLAY_TURN * 1000 * 60
      }
    });
    await redis.rpush('works_cron', data);
  }
}

module.exports = TimeNotificationWs;
