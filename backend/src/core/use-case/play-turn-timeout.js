class PlayTurnTimeout {
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
        card = player.cards[i];
        player.cards.splice(i, 1);
        room.deck.discard(card);
        break;
      }
    }
    if(card) {
      switch (card.value) {
      case 'SKI':
        room.setNextPosition();
        break;
      case 'REV':
        room.direction *= -1;
        break;
      }
    } else {
      player.cards.push(room.deck.drawFromDeck());
    }
    room.setNextPosition();
    await this.playerRepository.updatePlayer(player.id, {
      cards: player.cards,
    });
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

module.exports = PlayTurnTimeout;
