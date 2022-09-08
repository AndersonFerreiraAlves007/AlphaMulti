const {
  VALUE_REVERTE,
  VALUE_SKIP,
  POINTS_WINER,
  VALUE_M2,
  VALUE_M4
} = require('../utils/constants');

class PlayTurnTimeout {
  constructor (playerRepository, roomRepository, playerNotification, timeNotification) {
    this.playerRepository = playerRepository;
    this.roomRepository = roomRepository;
    this.playerNotification = playerNotification;
    this.timeNotification = timeNotification;
  }

  async execute (roomId) {
    const room = await this.roomRepository.getRoom(roomId);
    if(room) {
      if(room.isRun) {
        const players = await this.playerRepository.getPlayersRoom(room.id);
        const currentPlayer = players.some(item => item.order === room.position);
        if(currentPlayer) {
          const topCardsDiscarded = room.deck.getTopCardsDiscarded();
          if(currentPlayer.isBot) {
            let card = null;
            for(let i = 0; i < currentPlayer.cards.length; i++) {
              if(currentPlayer.cards[i].evaluateCard(topCardsDiscarded.color, topCardsDiscarded.value)) {
                card = currentPlayer.cards[i];
                currentPlayer.cards.splice(i, 1);
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
            }
            room.setNextPosition();
          } else {
            currentPlayer.cards.push(room.deck.drawFromDeck());
            room.setNextPosition();
          }

          await this.playerRepository.updatePlayer(currentPlayer.id, {
            cards: players.cards.map(item => ({ color: item.color, value: item.value })), 
          });

          await this.roomRepository.updateRoom(room.id, {
            startLastTurnAt: new Date(),
            direction: room.direction,
            position: room.position,
            cards: room.deck.cards.map(item => ({ color: item.color, value: item.value })),
            cardsDiscarded: room.deck.cardsDiscarded.map(item => ({ color: item.color, value: item.value })),
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

module.exports = PlayTurnTimeout;
