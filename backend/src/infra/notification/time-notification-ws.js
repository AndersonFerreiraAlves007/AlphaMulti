const TimeNotification = require('../../core/notification/time-notification');

class TimeNotificationWs extends TimeNotification{
  async createRoom(roomId) {}

  async makeMove(roomId) {}
}

module.exports = TimeNotificationWs;
