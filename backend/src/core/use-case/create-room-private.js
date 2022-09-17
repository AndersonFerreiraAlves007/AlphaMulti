const {
  ROOM_PRIVATE
} = require('../utils/constants');
const {
  makeid
} = require('../utils/code');

class GetDataRoom {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (playerId, nameRoom, passwordRoom) {
    const player = await this.playerRepository.getPlayer(playerId);
    if(!player) return null;
    if(player.roomId) return null;
    if(player) {
      const room = await this.roomRepository.createRoom({
        createdAt: new Date().getTime(),
        startGameAt: 0,
        startLastTurnAt: 0,
        direction: 1,
        isRun: false,
        cards: '',
        position: 1,
        cardsDiscarded: '',
        amount: 0,
        type: ROOM_PRIVATE,
        password: passwordRoom,
        name: nameRoom,
        code: makeid(5)
      });
      this.timeNotification.createRoom(room.id);
      await this.playerRepository.updatePlayer(player.id, {
        roomId: room.id
      });
      this.playerNotification.enterPlayer(room.id, player.id);
      return {
        roomId: room.id
      };
    }
  }
}

module.exports = GetDataRoom;
