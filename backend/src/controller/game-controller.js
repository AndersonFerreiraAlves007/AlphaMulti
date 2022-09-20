const EnterRandomRoomUseCase = require('../core/use-case/enter-random-room');
const GetDataPlayerUseCase = require('../core/use-case/get-data-player');
const GetDataRoomUseCase = require('../core/use-case/get-data-room');
const LeaveRoomUseCase = require('../core/use-case/leave-room');
const LoginUseCase = require('../core/use-case/login');
const LogoutUseCase = require('../core/use-case/logout');
const PlayTurnUseCase = require('../core/use-case/play-turn');
const PlayTurnTimeoutUseCase = require('../core/use-case/play-turn-timeout');
const StartGameTimeoutUseCase = require('../core/use-case/start-game-timeout');
const GetRoomsPrivateUseCase = require('../core/use-case/get-rooms-privates');
const CreateRoomPrivateUseCase = require('../core/use-case/create-room-private');
const EnterPrivateRoomUseCase = require('../core/use-case/enter-private-room');

const PlayerRepositoryRedis = require('../infra/repository/player-repository-redis');
const RoomRepositoryRedis = require( '../infra/repository/room-repository-redis');
const PlayerNotificationWs = require( '../infra/notification/player-notification-ws');
const TimeNotificationWs = require( '../infra/notification/time-notification-ws');
const GlobalData = require('../infra/data/global');

class GameController {
  static async enterRandomRoom (params, body) {
    const ws = GlobalData.ws;
    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();
    const playerNotificationWs = new PlayerNotificationWs(ws);
    const timeNotificationWs = new TimeNotificationWs();

    const enterRadomRoomUseCase = new EnterRandomRoomUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis,
      playerNotificationWs,
      timeNotificationWs
    );

    const result = await enterRadomRoomUseCase.execute(params.playerId);
    return result;
  }

  static async getDataPlayer (params, body) {
    const playerRepositoryRedis = new PlayerRepositoryRedis();

    const getDataPlayerUseCase = new GetDataPlayerUseCase(
      playerRepositoryRedis
    );

    const result = await getDataPlayerUseCase.execute(params.playerId);
    return result;
  }

  static async getDataRoom (params, body) {
    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();

    const getDataRoomUseCase = new GetDataRoomUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis
    );

    const result = await getDataRoomUseCase.execute(params.roomId);
    return result;
  }

  static async leaveRoom (params, body) {
    const ws = GlobalData.ws;

    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();
    const playerNotificationWs = new PlayerNotificationWs(ws);

    const leaveRoomUseCase = new LeaveRoomUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis,
      playerNotificationWs
    );

    const result = await leaveRoomUseCase.execute(params.playerId);
    return result;
  }

  static async login (params, body) {
    const playerRepositoryRedis = new PlayerRepositoryRedis();

    const loginUseCase = new LoginUseCase(
      playerRepositoryRedis
    );

    const result = await loginUseCase.execute(body.playerId, body.username, body.avatar);
    return result;
  }

  static async logout (params, body) {
    const ws = GlobalData.ws;

    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();
    const playerNotificationWs = new PlayerNotificationWs(ws);

    const logoutUseCase = new LogoutUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis,
      playerNotificationWs
    );

    const result = await logoutUseCase.execute(params.playerId);
    return result;
  }

  static async playTurnTimeout (params, body) {
    const ws = GlobalData.ws;

    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();
    const playerNotificationWs = new PlayerNotificationWs(ws);
    const timeNotificationWs = new TimeNotificationWs();

    const playTurnTimeoutUseCase = new PlayTurnTimeoutUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis,
      playerNotificationWs,
      timeNotificationWs
    );

    const result = await playTurnTimeoutUseCase.execute(params.roomId, params.position);
    return result;
  }

  static async playTurn (params, body) {
    const ws = GlobalData.ws;

    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();
    const playerNotificationWs = new PlayerNotificationWs(ws);
    const timeNotificationWs = new TimeNotificationWs();

    const playTurnUseCase = new PlayTurnUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis,
      playerNotificationWs,
      timeNotificationWs
    );

    const result = await playTurnUseCase.execute(body.playerId, body.color, body.value);
    return result;
  }

  static async startGameTimeout (params, body) {
    const ws = GlobalData.ws;

    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();
    const playerNotificationWs = new PlayerNotificationWs(ws);
    const timeNotificationWs = new TimeNotificationWs();

    const startGameTimeoutUseCase = new StartGameTimeoutUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis,
      playerNotificationWs,
      timeNotificationWs
    );

    const result = await startGameTimeoutUseCase.execute(params.roomId);
    return result;
  }

  static async getRoomsPrivate (params, body) {
    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();

    const getRoomsPrivateUseCase = new GetRoomsPrivateUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis
    );

    const result = await getRoomsPrivateUseCase.execute();
    return result;
  }

  static async createRoomPrivate (params, body) {
    const ws = GlobalData.ws;

    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();
    const playerNotificationWs = new PlayerNotificationWs(ws);
    const timeNotificationWs = new TimeNotificationWs();

    const createRoomPrivateUseCase = new CreateRoomPrivateUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis,
      playerNotificationWs,
      timeNotificationWs
    );

    const result = await createRoomPrivateUseCase.execute(body.playerId, body.name, body.password);
    return result;
  }

  static async enterPrivateRoom (params, body) {
    const ws = GlobalData.ws;
    
    const playerRepositoryRedis = new PlayerRepositoryRedis();
    const roomRepositoryRedis = new RoomRepositoryRedis();
    const playerNotificationWs = new PlayerNotificationWs(ws);
    const timeNotificationWs = new TimeNotificationWs();

    const enterRadomRoomUseCase = new EnterPrivateRoomUseCase(
      playerRepositoryRedis,
      roomRepositoryRedis,
      playerNotificationWs,
      timeNotificationWs
    );

    const result = await enterRadomRoomUseCase.execute(params.playerId, params.roomId, params.password);
    return result;
  }
}

module.exports = GameController;
