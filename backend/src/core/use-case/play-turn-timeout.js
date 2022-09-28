const {
  VALUE_REVERTE,
  VALUE_SKIP,
  POINTS_WINER,
  VALUE_M2,
  VALUE_M4,
  COLOR_ESPECIAL
} = require('../utils/constants');
const {
  MINUTES_PLAY_TURN
} = require('../../utils/constants');
const {
  randomColor
} = require('../utils/radomColor');

class PlayTurnTimeout {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (roomId, position, turn) {
    try {
      const room = await this.roomRepository.getRoom(roomId);
      console.log(turn);
      console.log(room);
      if(room) {
        if(room.position === position && room.turn === turn) {
          if(room.isRun) {
            const players = await this.playerRepository.getPlayersRoom(room.id);
            const currentPlayer = players.find(item => item.order === room.position);
            if(currentPlayer) {
              const topCardsDiscarded = room.deck.getTopCardsDiscarded();
              if(currentPlayer.isBot) {
                let card = null;
                for(let i = 0; i < currentPlayer.cards.length; i++) {
                  if(currentPlayer.cards[i].evaluateCard(topCardsDiscarded.color, topCardsDiscarded.value)) {
                    card = currentPlayer.cards[i];
                    currentPlayer.cards.splice(i, 1);
                    if(card.color === COLOR_ESPECIAL) card.color = randomColor();
                    room.deck.discard(card);
                    break;
                  }
                }
                if(card) {
                  switch (card.value) {
                  case VALUE_SKIP:
                    for(let i = 0; i < room.amount; i++) {
                      currentPlayer.cards.push(room.deck.drawFromDeck());
                    }
                    room.amount = 0;
                    room.setNextPosition();
                    break;
                  case VALUE_REVERTE:
                    for(let i = 0; i < room.amount; i++) {
                      currentPlayer.cards.push(room.deck.drawFromDeck());
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
                      currentPlayer.cards.push(room.deck.drawFromDeck());
                    }
                    room.amount = 0;
                    break;
                  }
                } else {
                  currentPlayer.cards.push(room.deck.drawFromDeck());
                  for(let i = 0; i < room.amount; i++) {
                    currentPlayer.cards.push(room.deck.drawFromDeck());
                  }
                  room.amount = 0;
                }
              } else {
                currentPlayer.cards.push(room.deck.drawFromDeck());
                for(let i = 0; i < room.amount; i++) {
                  currentPlayer.cards.push(room.deck.drawFromDeck());
                }
                room.amount = 0;
              }
              room.setNextPosition();
              await this.playerRepository.updatePlayer(currentPlayer.id, {
                cards: currentPlayer.toStringCards(), 
              });
              room.turn = room.turn + 1;
              await this.roomRepository.updateRoom(room.id, {
                startLastTurnAt: new Date().getTime() + MINUTES_PLAY_TURN * 60 * 1000,
                direction: room.direction,
                position: room.position,
                cards: room.deck.toStringCards(),
                cardsDiscarded: room.deck.toStringCardsDiscarded(),
                amount: room.amount,
                turn: room.turn
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
                const newScore = winer.score + POINTS_WINER;
                await this.playerRepository.updatePlayer(winer.id, {
                  score: newScore,
                });

                const bots = await this.playerRepository.getPlayersBotRoom(room.id);
                for(let i = 0; i < bots.length; i++) {
                  await this.playerRepository.deletePlayer(bots[i].id);
                }
                const humans = await this.playerRepository.getPlayersHumanRoom(room.id);
                await this.playerNotification.endGame(room.id, winer ? winer.id : '', newScore);
                for(let i = 0; i < humans.length; i++) {
                  await this.playerRepository.updatePlayer(humans[i].id, {
                    roomId: '',
                    cards: '',
                    order: -1
                  });
                }
                await this.roomRepository.deleteRoom(room.id);
                
                //this.playerNotification.changeRoomsAvaliables();
              } else {
                this.timeNotification.makeMove(room.id, room.position, room.turn);
                this.playerNotification.makeMove(room.id);
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

module.exports = PlayTurnTimeout;
