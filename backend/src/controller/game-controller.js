const EnterRandomRoom = require('../core/use-case/enter-random-room');
const GetDataPlayer = require('../core/use-case/get-data-player');
const GetDataRoom = require('../core/use-case/get-data-room');
const LeaveRoom = require('../core/use-case/leave-room');
const Login = require('../core/use-case/login');
const Logout = require('../core/use-case/logout');
const PlayTurn = require('../core/use-case/play-turn');
const PlayTurnTimeout = require('../core/use-case/play-turn-timeout');
const StartGameTimeout = require('../core/use-case/start-game-timeout');

const PlayerRepositoryRedis = require('../infra/repository/player-repository-redis');
const RoomRepositoryRedis = require( '../infra/repository/room-repository-redis');
const PlayerNotificationWs = require( '../infra/notification/player-notification-ws');
const TimeNotificationWs = require( '../infra/notification/time-notification-ws');

class GameController {
  static async enterRandomRoom (params, body) {
    const enterRadomRoom = new EnterRandomRoom();
    const parkingLot = await enterRadomRoom.execute(params.code);
    return parkingLot;
  }
  static async getDataPlayer (params, body) {
    const parkingLot = await getParkingLot.execute(params.code);
    return parkingLot;
  }
  static async getDataRoom (params, body) {
    const parkingLot = await getParkingLot.execute(params.code);
    return parkingLot;
  }
  static async leaveRoom (params, body) {
    const parkingLot = await getParkingLot.execute(params.code);
    return parkingLot;
  }
  static async login (params, body) {
    const parkingLot = await getParkingLot.execute(params.code);
    return parkingLot;
  }
  static async logout (params, body) {
    const parkingLot = await getParkingLot.execute(params.code);
    return parkingLot;
  }
  static async playTurnTimeout (params, body) {
    const parkingLot = await getParkingLot.execute(params.code);
    return parkingLot;
  }
  static async playTurn (params, body) {
    const parkingLot = await getParkingLot.execute(params.code);
    return parkingLot;
  }
  static async startGameTimeout (params, body) {
    const parkingLot = await getParkingLot.execute(params.code);
    return parkingLot;
  }
}

module.exports = GameController;