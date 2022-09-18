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
    try {
      console.log('playerId', playerId);
      console.log('color', color);
      console.log('value', value);
      const player = await this.playerRepository.getPlayer(playerId);
      console.log('player', player);
      if(player) {
        console.log('execute 1');
        if(!player.isBot) {
          console.log('execute 2');
          if(player.roomId) {
            console.log('execute 3');
            const room = await this.roomRepository.getRoom(player.roomId);
            console.log('execute 4');
            const topCardsDiscarded = room.deck.getTopCardsDiscarded();
            console.log('execute 5');
            if(room.isRun) {
              console.log('execute 6');
              if(room.position === player.order) {
                console.log('execute 7');
                if(color === ''  && value === '') {
                  console.log('execute 8');
                  player.cards.push(room.deck.drawFromDeck());
                  console.log('execute 9');
                  console.log('execute 10');
                  for(let i = 0; i < room.amount; i++) {
                    player.cards.push(room.deck.drawFromDeck());
                  }
                  room.amount = 0;
                } else {
                  console.log('execute 11');
                  let card = null;
                  console.log('execute 12');
                  for(let i = 0; i < player.cards.length; i++) {
                    console.log('execute 12.1');
                    console.log(player.cards[i]);
                    console.log(color, value);
                    if(player.cards[i].hasCard(color, value)) {
                      console.log('execute 12.2');
                      card = player.cards[i];
                      card.color = color;
                      player.cards.splice(i, 1);
                      room.deck.discard(card);
                      break;
                    }
                  }
                  console.log('execute 13');
                  console.log(card);
                  console.log('execute 14');
                  if(card) {
                    console.log('execute 15');
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
                room.setNextPosition();
                console.log('execute 16');
                await this.playerRepository.updatePlayer(player.id, {
                  cards: player.toStringCards(),  
                });
                console.log('execute 17');
                await this.roomRepository.updateRoom(room.id, {
                  startLastTurnAt: new Date().getTime(),
                  direction: room.direction,
                  position: room.position,
                  cards: room.deck.toStringCards(),
                  cardsDiscarded: room.deck.toStringCardsDiscarded(),
                  amount: room.amount
                });
                console.log('execute 18');
                const players = await this.playerRepository.getPlayersRoom(room.id);
                console.log('execute 19');
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
                      cards: '',
                      order: -1
                    });
                  }
                  await this.roomRepository.deleteRoom(room.id);
                } else {
                  this.timeNotification.makeMove(room.id, room.position);
                }
                this.playerNotification.makeMove(room.id, winer ? winer.id : '');
              }
            }
          }
        }
      }
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = PlayTurn;
