const {
  VALUE_REVERTE,
  VALUE_SKIP,
  POINTS_WINER,
  VALUE_M2,
  VALUE_M4
} = require('../utils/constants');


class PlayTurn {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (playerId, color, value) {
    const player = await this.playerRepository.getPlayer(playerId);
    if(player) {
      if(!player.isBot) {
        if(player.roomId) {
          const room = await this.roomRepository.getRoom(player.roomId);
          const topCardsDiscarded = room.deck.getTopCardsDiscarded();
          if(room.isRun) {
            if(room.position === player.order) {
              if(color === ''  && value === '') {
                player.cards.push(room.deck.drawFromDeck());
                room.setNextPosition();
              } else {
                let card = null;
                for(let i = 0; i < player.cards.length; i++) {
                  if(player.cards[i].hasCard(color, value)) {
                    card = player.cards[i];
                    card.color = color;
                    player.cards.splice(i, 1);
                    room.deck.discard(card);
                    break;
                  }
                }
                room.setNextPosition();
                if(card) {
                  //const players = await this.playerRepository.getPlayersRoom(room.id);
                  //const nextPlayer = players.some(item => item.order === room.position);
                  if(topCardsDiscarded.evaluateCard(color, value)) {
                    switch (card.value) {
                    case VALUE_SKIP:
                      for(let i = 0; i < room.amount; i++) {
                        player.cards.push(room.deck.drawFromDeck());
                      }
                      room.amount = 0;
                      room.setNextPosition();
                      break;
                    case VALUE_REVERTE:
                      for(let i = 0; i < room.amount; i++) {
                        player.cards.push(room.deck.drawFromDeck());
                      }
                      room.amount = 0;
                      room.direction *= -1;
                      break;
                    case VALUE_M2:
                      room.amount += 2;
                      break;
                    case VALUE_M4:
                      room.amount += 4;
                      break;
                    default:
                      for(let i = 0; i < room.amount; i++) {
                        player.cards.push(room.deck.drawFromDeck());
                      }
                      room.amount = 0;
                      break;
                    }
                  } else {
                    throw 'Jogada inválida';
                  }
                } else {
                  throw 'Jogada inválida';
                }
                
              }

              await this.playerRepository.updatePlayer(player.id, {
                cards: players.cards.map(item => ({ color: item.color, value: item.value })), 
              });

              await this.roomRepository.updateRoom(room.id, {
                startLastTurnAt: new Date(),
                direction: room.direction,
                position: room.position,
                cards: room.deck.cards.map(item => ({ color: item.color, value: item.value })),
                cardsDiscarded: room.deck.cardsDiscarded.map(item => ({ color: item.color, value: item.value })),
                amount: room.amount
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
                  score: winer.score + POINTS_WINER,
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
              this.playerNotification.makeMove(room.id, winer ? winer.id : '');
            }
          }
        }
      }
    }
  }
}

module.exports = PlayTurn;
