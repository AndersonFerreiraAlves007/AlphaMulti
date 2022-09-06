const Deck = require('../entity/deck');

class PlayTurn {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (idPlayer, color, value) {
    const player = await this.playerRepository.getPlayer(idPlayer);
    const room = await this.roomRepository.getRoom(player.roomId);
    let card = null;
    for(let i = 0; i < player.cards.length; i++) {
      if(player.cards[i].evaluateCard(color, value)) {
        // remove dos cards do player
        // coloca topo da ilha de descarte
        // seta card
      }
    }
    if(card) {
      // faz jogada
    } else {
      // compra card
    }
    // salva jogador
    const players = await this.playerRepository.getPlayersRoom(room.id);
    let winer = null;
    for(let i = 0; i < players.length; i++) {
      const isWiner = players[i].isWiner();
      if(isWiner) {
        winer = players[i];
        break;
      }
    }
    if(winer) {
      await this.playerRepository.updatePlayer(winer.id, {
        roomId: '',
        score: winer.score + 500,
        cards: []
      });
      const bots = await this.playerRepository.getPlayersBotRoom(room.id);
      for(let i = 0; i < bots.length; i++) {
        await this.playerRepository.deletePlayer(bots[i].id);
      }
      const humans = await this.playerRepository.getPlayersHumanRoom(room.id);
      for(let i = 0; i < humans.length; i++) {
        await this.playerRepository.updatePlayer(humans.id, {
          roomId: '',
          cards: [],
          order: -1
        });
      }
      await this.roomRepository.deleteRoom(room.id);
    }
    this.playerNotification.makeMove(room.id);
  }
}

module.exports = PlayTurn;
