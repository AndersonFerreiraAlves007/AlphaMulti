import { Globals } from './globals.js';
import { Modal } from './modal.js';

const player = {
  id: 1,
  username: 'Anderson',
  cards: [
    {
      color: 'b',
      value: '1',
    },
    {
      color: 'r',
      value: '2',
    },
    {
      color: 'b',
      value: '3',
    },
    {
      color: 'g',
      value: '4',
    },
    {
      color: 's',
      value: 's1',
    },
    {
      color: 'y',
      value: '6',
    },
    {
      color: 's',
      value: 'm4',
    },
  ],
  score: 1000,
  order: 1,
  isBot: false,
  avatar: './src/assets/img/users/user1.svg',
};

const room = {
  id: 1,
  createdAt: new Date(),
  startGameAt: new Date(),
  startLastTurnAt: new Date(),
  direction: 1,
  isRun: true,
  type: 'public',
  name: 'Sala Legal',
  code: '',
  topCard: {
    color: 's',
    value: 'm4',
  },
  positionActive: 1,
  players: [
    {
      id: 1,
      username: 'Anderson',
      numberCards: 4,
      score: 1000,
      order: 1,
      isBot: false,
      avatar: './src/assets/img/users/user1.svg',
    },
    {
      id: 2,
      username: 'Adriana',
      numberCards: 7,
      score: 1000,
      order: 2,
      isBot: false,
      avatar: './src/assets/img/users/user2.svg',
    },
    {
      id: 3,
      username: 'Manu',
      numberCards: 7,
      score: 1000,
      order: 3,
      isBot: false,
      avatar: './src/assets/img/users/user3.svg',
    },
    {
      id: 4,
      username: 'Brenda',
      numberCards: 1,
      score: 1000,
      order: 4,
      isBot: false,
      avatar: './src/assets/img/users/user4.svg',
    },
  ],
};

function getImgCard(color, value) {
  let folder = '';
  switch (color) {
    case 'b':
      folder = 'blue';
      break;
    case 'r':
      folder = 'red';
      break;
    case 'g':
      folder = 'green';
      break;
    case 'y':
      folder = 'yellow';
      break;
    case 's':
      folder = 'special';
      break;
  }
  if (value === 'm4') return `./src/assets/img/cards/${folder}/m4.svg`;
  if (value === 's1') return `./src/assets/img/cards/${folder}/s1.svg`;
  return `./src/assets/img/cards/${folder}/${value}.svg`;
}

let idInterval;

const renderGamePage2 = () => {
  clearInterval(idInterval);
  const player = Globals.player;
  const room = Globals.room;

  const orderPlayer = player.order;

  room.players.sort((a, b) => a.order - b.order);

  const players = room.players;

  const playerIndex = players.findIndex((item) => item.order === orderPlayer);

  let index = playerIndex;

  /* const player4 = players[index] */
  const player4 = player;
  index = index + 1;
  index = index > 3 ? 0 : index;

  const player2 = players[index];
  index = index + 1;
  index = index > 3 ? 0 : index;

  const player1 = players[index];
  index = index + 1;
  index = index > 3 ? 0 : index;

  const player3 = players[index];
  index = index + 1;
  index = index > 3 ? 0 : index;

  const page = document.getElementById('page');

  const main = document.createElement('main');
  page.append(main);

  const purchaseDeck = document.createElement('img');
  purchaseDeck.classList.add('card', 'img__deck');
  purchaseDeck.src = './src/assets/img/verso-carta.png';
  main.append(purchaseDeck);
  purchaseDeck.addEventListener('click', () => {
    Globals.serverCommunication.playTurn('', '');
  });

  const background = document.createElement('img');
  background.classList.add('background');
  background.setAttribute('src', './src/assets/img/background.png');
  main.append(background);

  const buttonsConfigure = document.createElement('div');
  buttonsConfigure.classList.add('buttons__configure');
  main.append(buttonsConfigure);

  const buttonSound = document.createElement('input');
  buttonSound.classList.add('button__sound');
  const audio = document.getElementById('audio-background');
  if (audio.paused) {
    buttonSound.src = './src/assets/img/mute.png';
  } else {
    buttonSound.src = './src/assets/img/button-sound.png';
  }

  buttonSound.addEventListener('click', () => {
    if (audio.paused) {
      audio.volume = 0.1;
      audio.play();
      audio.loop = true;
      buttonSound.src = './src/assets/img/button-sound.png';
    } else {
      audio.pause();
      buttonSound.src = './src/assets/img/mute.png';
    }
  });

  buttonsConfigure.append(buttonSound);
  //buttonsConfigure.append(buttonClose);

  const btnBack = document.createElement('img');
  btnBack.classList.add('button__back');
  btnBack.src = './src/assets/img/back-icon.svg';
  btnBack.addEventListener('click', () => {
    Globals.serverCommunication.leaveRoom();
    //navigate('roomOptions')
  });
  buttonsConfigure.append(btnBack);

  const infoUserPerfil1 = document.createElement('div');
  infoUserPerfil1.classList.add('info__user--perfil');
  main.append(infoUserPerfil1);

  const infoUserPerfil1Foto = document.createElement('img');
  infoUserPerfil1Foto.classList.add('foto');
  infoUserPerfil1Foto.setAttribute('src', player1.avatar);
  infoUserPerfil1.append(infoUserPerfil1Foto);

  const infoUserPerfil1H2 = document.createElement('h2');
  infoUserPerfil1H2.innerText = player1.username;
  infoUserPerfil1.append(infoUserPerfil1H2);

  if (player1.order === room.positionActive) {
    const infoUserPerfil1TimeUser = document.createElement('h3');
    infoUserPerfil1TimeUser.classList.add('time__user');
    infoUserPerfil1TimeUser.innerText = '0:10';
    infoUserPerfil1.append(infoUserPerfil1TimeUser);
    idInterval = setInterval(() => {
      const time = new Date().getTime() - new Date(room.startLastTurnAt).getTime();
      const minutes = parseInt(time / (1000 * 60));
      const seconds = parseInt((time % (1000 * 60)) / 1000);
      infoUserPerfil1TimeUser.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    }, 1000);
  }

  const rowAlinhametoTranslate1 = document.createElement('div');
  rowAlinhametoTranslate1.classList.add('row', 'alinhamento2', 'translate');
  main.append(rowAlinhametoTranslate1);

  /* const cardsUser1Card1 = document.createElement('img');
  cardsUser1Card1.classList.add('card', 'overflowA')
  cardsUser1Card1.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card1)
  const cardsUser1Card2 = document.createElement('img');
  cardsUser1Card2.classList.add('card', 'overflowA2')
  cardsUser1Card2.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card2)
  const cardsUser1Card3 = document.createElement('img');
  cardsUser1Card3.classList.add('card', 'overflowA3')
  cardsUser1Card3.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card3)
  const cardsUser1Card4 = document.createElement('img');
  cardsUser1Card4.classList.add('card', 'overflowA4')
  cardsUser1Card4.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card4)
  const cardsUser1Card5 = document.createElement('img');
  cardsUser1Card5.classList.add('card', 'overflowA5')
  cardsUser1Card5.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card5)
  const cardsUser1Card6 = document.createElement('img');
  cardsUser1Card6.classList.add('card', 'overflowA6')
  cardsUser1Card6.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card6)
  const cardsUser1Card7 = document.createElement('img');
  cardsUser1Card7.classList.add('card', 'overflowA7')
  cardsUser1Card7.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card7) */

  for (let i = 1; i <= player1.numberCards; i++) {
    const cardsUser1Card1 = document.createElement('img');
    cardsUser1Card1.classList.add('card', `overflowA${i > 1 ? `${i}` : ''}`);
    cardsUser1Card1.setAttribute('src', './src/assets/img/verso-carta.png');
    rowAlinhametoTranslate1.append(cardsUser1Card1);
  }

  const colunaAlinhamento = document.createElement('div');
  colunaAlinhamento.classList.add('columnT', 'alinhamento');
  main.append(colunaAlinhamento);

  const testeUser1 = document.createElement('div');
  testeUser1.classList.add('teste');
  colunaAlinhamento.append(testeUser1);

  const infoUserPerfil2 = document.createElement('div');
  infoUserPerfil2.classList.add('info__user--perfil');
  testeUser1.append(infoUserPerfil2);

  const infoUserPerfil2Foto = document.createElement('img');
  infoUserPerfil2Foto.classList.add('foto');
  infoUserPerfil2Foto.setAttribute('src', player2.avatar);
  infoUserPerfil2.append(infoUserPerfil2Foto);

  const infoUserPerfil2H2 = document.createElement('h2');
  infoUserPerfil2H2.innerText = player2.username;
  infoUserPerfil2.append(infoUserPerfil2H2);

  if (player2.order === room.positionActive) {
    const infoUserPerfil2TimeUser = document.createElement('h3');
    infoUserPerfil2TimeUser.classList.add('time__user');
    infoUserPerfil2TimeUser.innerText = '0:10';
    infoUserPerfil2.append(infoUserPerfil2TimeUser);
    idInterval = setInterval(() => {
      const time = new Date().getTime() - new Date(room.startLastTurnAt).getTime();
      const minutes = parseInt(time / (1000 * 60));
      const seconds = parseInt((time % (1000 * 60)) / 1000);
      infoUserPerfil2TimeUser.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    }, 1000);
  }

  const colunaEsquerda = document.createElement('div');
  colunaEsquerda.classList.add('column', 'esquerda');
  testeUser1.append(colunaEsquerda);

  /* const cardsUser2Card1 = document.createElement('img');
  cardsUser2Card1.classList.add('card', 'overflowY')
  cardsUser2Card1.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card1)
  const cardsUser2Card2 = document.createElement('img');
  cardsUser2Card2.classList.add('card', 'overflowY2')
  cardsUser2Card2.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card2)
  const cardsUser2Card3 = document.createElement('img');
  cardsUser2Card3.classList.add('card', 'overflowY3')
  cardsUser2Card3.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card3)
  const cardsUser2Card4 = document.createElement('img');
  cardsUser2Card4.classList.add('card', 'overflowY4')
  cardsUser2Card4.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card4)
  const cardsUser2Card5 = document.createElement('img');
  cardsUser2Card5.classList.add('card', 'overflowY5')
  cardsUser2Card5.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card5)
  const cardsUser2Card6 = document.createElement('img');
  cardsUser2Card6.classList.add('card', 'overflowY6')
  cardsUser2Card6.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card6)
  const cardsUser2Card7 = document.createElement('img');
  cardsUser2Card7.classList.add('card', 'overflowY7')
  cardsUser2Card7.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card7) */

  for (let i = 1; i <= player2.numberCards; i++) {
    const cardsUser2Card1 = document.createElement('img');
    cardsUser2Card1.classList.add('card', `overflowY${i > 1 ? `${i}` : ''}`);
    cardsUser2Card1.setAttribute('src', './src/assets/img/verso-carta.png');
    colunaEsquerda.append(cardsUser2Card1);
  }

  const cartaMeio = document.createElement('div');
  cartaMeio.classList.add('carta-meio');
  colunaAlinhamento.append(cartaMeio);

  const cartaLixo = document.createElement('img');
  cartaLixo.classList.add('carta-lixo');
  cartaLixo.setAttribute('src', getImgCard(room.topCard.color, room.topCard.value));
  cartaMeio.append(cartaLixo);

  const testeUser2 = document.createElement('div');
  testeUser2.classList.add('teste');
  colunaAlinhamento.append(testeUser2);

  const colunaDireita = document.createElement('div');
  colunaDireita.classList.add('column', 'direita');
  testeUser2.append(colunaDireita);

  /* const cardsUser3Card1 = document.createElement('img');
  cardsUser3Card1.classList.add('card', 'overflowZ')
  cardsUser3Card1.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card1)
  const cardsUser3Card2 = document.createElement('img');
  cardsUser3Card2.classList.add('card', 'overflowZ2')
  cardsUser3Card2.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card2)
  const cardsUser3Card3 = document.createElement('img');
  cardsUser3Card3.classList.add('card', 'overflowZ3')
  cardsUser3Card3.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card3)
  const cardsUser3Card4 = document.createElement('img');
  cardsUser3Card4.classList.add('card', 'overflowZ4')
  cardsUser3Card4.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card4)
  const cardsUser3Card5 = document.createElement('img');
  cardsUser3Card5.classList.add('card', 'overflowZ5')
  cardsUser3Card5.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card5)
  const cardsUser3Card6 = document.createElement('img');
  cardsUser3Card6.classList.add('card', 'overflowZ6')
  cardsUser3Card6.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card6)
  const cardsUser3Card7 = document.createElement('img');
  cardsUser3Card7.classList.add('card', 'overflowZ7')
  cardsUser3Card7.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card7) */

  for (let i = 1; i <= player3.numberCards; i++) {
    const cardsUser2Card1 = document.createElement('img');
    cardsUser2Card1.style.transform = `translate(${-50 * i}%)`;
    /*  cardsUser2Card1.classList.add('card', `overflowZ${i > 1 ? `${i}` : ''}`); */
    cardsUser2Card1.setAttribute('src', './src/assets/img/verso-carta.png');
    colunaDireita.append(cardsUser2Card1);
  }

  const infoUserPerfil3 = document.createElement('div');
  infoUserPerfil2.classList.add('info__user--perfil');
  testeUser2.append(infoUserPerfil3);

  const infoUserPerfil3Foto = document.createElement('img');
  infoUserPerfil3Foto.classList.add('foto');
  infoUserPerfil3Foto.setAttribute('src', player3.avatar);
  infoUserPerfil3.append(infoUserPerfil3Foto);

  const infoUserPerfil3H2 = document.createElement('h2');
  infoUserPerfil3H2.innerText = player3.username;
  infoUserPerfil3.append(infoUserPerfil3H2);

  if (player3.order === room.positionActive) {
    const infoUserPerfil3TimeUser = document.createElement('h3');
    infoUserPerfil3TimeUser.classList.add('time__user');
    infoUserPerfil3TimeUser.innerText = '0:10';
    infoUserPerfil3.append(infoUserPerfil3TimeUser);
    idInterval = setInterval(() => {
      const time = new Date().getTime() - new Date(room.startLastTurnAt).getTime();
      const minutes = parseInt(time / (1000 * 60));
      const seconds = parseInt((time % (1000 * 60)) / 1000);
      infoUserPerfil3TimeUser.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    }, 1000);
  }

  const userFour = document.createElement('div');
  userFour.classList.add('user__four');
  main.append(userFour);

  const traslate2 = document.createElement('div');
  traslate2.classList.add('translate2');
  userFour.append(traslate2);

  /* const cardsUser4Card1 = document.createElement('img');
  cardsUser4Card1.classList.add('card', 'overflowB')
  cardsUser4Card1.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card1)
  const cardsUser4Card2 = document.createElement('img');
  cardsUser4Card2.classList.add('card', 'overflowB2')
  cardsUser4Card2.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card2)
  const cardsUser4Card3 = document.createElement('img');
  cardsUser4Card3.classList.add('card', 'overflowB3')
  cardsUser4Card3.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card3)
  const cardsUser4Card4 = document.createElement('img');
  cardsUser4Card4.classList.add('card', 'overflowB4')
  cardsUser4Card4.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card4)
  const cardsUser4Card5 = document.createElement('img');
  cardsUser4Card5.classList.add('card', 'overflowB5')
  cardsUser4Card5.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card5)
  const cardsUser4Card6 = document.createElement('img');
  cardsUser4Card6.classList.add('card', 'overflowB6')
  cardsUser4Card6.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card6)
  const cardsUser4Card7 = document.createElement('img');
  cardsUser4Card7.classList.add('card', 'overflowB7')
  cardsUser4Card7.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card7) */

  for (let i = 0; i < player4.cards.length; i++) {
    const cardsUser2Card1 = document.createElement('img');
    cardsUser2Card1.classList.add('card', `overflowB${i + 1 > 1 ? `${i + 1}` : ''}`, 'card-player');
    cardsUser2Card1.setAttribute('src', getImgCard(player4.cards[i].color, player4.cards[i].value));
    cardsUser2Card1.addEventListener('click', () => {
      if (player4.cards[i].value === 'm4' || player4.cards[i].value === 's1') {
        Modal.showChooseColorModal((color) => {
          Globals.serverCommunication.playTurn(color, player4.cards[i].value);
        });
      } else {
        Globals.serverCommunication.playTurn(player4.cards[i].color, player4.cards[i].value);
      }
    });
    traslate2.append(cardsUser2Card1);
  }

  const infoUserPerfil4 = document.createElement('div');
  infoUserPerfil4.classList.add('info__user--perfil');
  userFour.append(infoUserPerfil4);

  const infoUserPerfil4Foto = document.createElement('img');
  infoUserPerfil4Foto.classList.add('foto');
  infoUserPerfil4Foto.setAttribute('src', player4.avatar);
  infoUserPerfil4.append(infoUserPerfil4Foto);

  const infoUserPerfil4H2 = document.createElement('h2');
  infoUserPerfil4H2.innerText = player4.username;
  infoUserPerfil4.append(infoUserPerfil4H2);

  if (player4.order === room.positionActive) {
    const infoUserPerfil4TimeUser = document.createElement('h3');
    infoUserPerfil4TimeUser.classList.add('time__user');
    infoUserPerfil4TimeUser.innerText = '0:10';
    infoUserPerfil4.append(infoUserPerfil4TimeUser);
    idInterval = setInterval(() => {
      const time = new Date().getTime() - new Date(room.startLastTurnAt).getTime();
      const minutes = parseInt(time / (1000 * 60));
      const seconds = parseInt((time % (1000 * 60)) / 1000);
      infoUserPerfil4TimeUser.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    }, 1000);
  }

  /* document.getElementById('page').innerHTML = `
   <main>
     <img class="background" src="./src/assets/img/background.png">
     <div class="buttons__configure">
       <input class="button__sound" type="image" src="./src/assets/img/button-sound.png">
       <input class="button__close" type="image" src="./src/assets/img/button-close.png">
     </div>
     <div class="info__user--perfil">
       <img class="foto" src="./src/assets/img/users/user1.svg">
       <h2 class="">Kenji</h2>
       <h3 class="time__user">0:10</h3>
     </div>
     <div class="row alinhamento2 translate">
       <img class="card overflowA" src="./src/assets/img/verso-carta.png">
       <img class="card overflowA2" src="./src/assets/img/verso-carta.png">
       <img class="card overflowA3" src="./src/assets/img/verso-carta.png">
       <img class="card overflowA4" src="./src/assets/img/verso-carta.png">
       <img class="card overflowA5" src="./src/assets/img/verso-carta.png">
       <img class="card overflowA6" src="./src/assets/img/verso-carta.png">
       <img class="card overflowA7" src="./src/assets/img/verso-carta.png">
     </div>
     <div class="columnT alinhamento">
       <div class="teste">
         <div class="info__user--perfil">
           <img class="foto" src="./src/assets/img/users/user7.svg">
           <h2 class="">Ichigo</h2>
           <h3 class="time__user">0:10</h3>
         </div>
         <div class="column esquerda">
           <img class="card overflowY" src="./src/assets/img/verso-carta.png">
           <img class="card overflowY2" src="./src/assets/img/verso-carta.png">
           <img class="card overflowY3" src="./src/assets/img/verso-carta.png">
           <img class="card overflowY4" src="./src/assets/img/verso-carta.png">
           <img class="card overflowY5" src="./src/assets/img/verso-carta.png">
           <img class="card overflowY6" src="./src/assets/img/verso-carta.png">
           <img class="card overflowY7" src="./src/assets/img/verso-carta.png">
         </div>
       </div>
       <div class="carta-meio">
         <img class="carta-lixo" src="./src/assets/img/cards/red/3.svg">
       </div>
       <div class="teste">
         <div class="column direita">
           <img class="card overflowZ" src="./src/assets/img/verso-carta.png">
           <img class="card overflowZ2" src="./src/assets/img/verso-carta.png">
           <img class="card overflowZ3" src="./src/assets/img/verso-carta.png">
           <img class="card overflowZ4" src="./src/assets/img/verso-carta.png">
           <img class="card overflowZ5" src="./src/assets/img/verso-carta.png">
           <img class="card overflowZ6" src="./src/assets/img/verso-carta.png">
           <img class="card overflowZ7" src="./src/assets/img/verso-carta.png">
         </div>
         <div class="info__user--perfil">
           <img class="foto" src="./src/assets/img/users/user5.svg">
           <h2 class="">Naruto</h2>
           <h3 class="time__user">0:10</h3>
         </div>
       </div>
     </div>
     <div class="user__four">
       <div class="translate2">
         <img class="card overflowB" src="./src/assets/img/verso-carta.png">
         <img class="card overflowB2" src="./src/assets/img/verso-carta.png">
         <img class="card overflowB3" src="./src/assets/img/verso-carta.png">
         <img class="card overflowB4" src="./src/assets/img/verso-carta.png">
         <img class="card overflowB5" src="./src/assets/img/verso-carta.png">
         <img class="card overflowB6" src="./src/assets/img/verso-carta.png">
         <img class="card overflowB7" src="./src/assets/img/verso-carta.png">
       </div>
       <div class="info__user--perfil">
         <img class="foto" src="./src/assets/img/users/user10.svg">
         <h2 class="">Rukia</h2>
         <h3 class="time__user">0:10</h3>
       </div>
     </div>
     <h2 class="time__match">2:52</h2>
     <!-- <div id="card" class="card">
     </div> -->
   </main>
   `; */
};

const renderGamePage = () => {
  clearInterval(idInterval);
  Globals.player.numberCards = Globals.player.cards.length;
  const player = Globals.player;
  const room = Globals.room;

  const orderPlayer = player.order;

  room.players.sort((a, b) => a.order - b.order);

  const players = room.players;

  const playerIndex = players.findIndex((item) => item.order === orderPlayer);

  let index = playerIndex;

  /* const player4 = players[index] */
  const player4 = player;
  index = index + 1;
  index = index > 3 ? 0 : index;

  const player2 = players[index];
  index = index + 1;
  index = index > 3 ? 0 : index;

  const player1 = players[index];
  index = index + 1;
  index = index > 3 ? 0 : index;

  const player3 = players[index];
  index = index + 1;
  index = index > 3 ? 0 : index;

  const page = document.getElementById('page');
  const mainTag = document.createElement('main');
  mainTag.classList.add('gp__background');

  //Lado esquerdo do jogo
  const divLeftSide = document.createElement('div');
  divLeftSide.classList.add('gp__left-side');
  createUserInfoT(divLeftSide, player2, 'left', room.positionActive, room.startLastTurnAt);
  createUserDeck(divLeftSide, player2, 'horizontal', 'left');

  //Meio do jogo
  const divMidSide = document.createElement('div');
  divMidSide.classList.add('gp__mid-side');

  const divMidTop = document.createElement('div');
  divMidTop.classList.add('gp__mid-top');
  createUserInfoT(divMidTop, player1, 'top', room.positionActive, room.startLastTurnAt);
  createUserDeck(divMidTop, player1, 'vertical', 'top');
  divMidSide.appendChild(divMidTop);

  const divMidCenter = document.createElement('div');
  divMidCenter.classList.add('gp__mid-center');
  const arrowLeftImg = document.createElement('img');
  arrowLeftImg.classList.add(room.direction === 1 ? 'gp__left-arrow' : 'gp__left-arrow-anti');
  arrowLeftImg.setAttribute(
    'src',
    room.direction === 1
      ? './src/assets/img/seta-esq-hor.png'
      : './src/assets/img/seta-esq-anti.png'
  );

  const discardFieldImg = document.createElement('img');
  discardFieldImg.classList.add('gp__card-vertical');
  discardFieldImg.setAttribute('src', getImgCard(room.topCard.color, room.topCard.value));

  const arrowRightImg = document.createElement('img');
  arrowRightImg.classList.add(room.direction === 1 ? 'gp__right-arrow' : 'gp__right-arrow-anti');
  arrowRightImg.setAttribute(
    'src',
    room.direction === 1
      ? './src/assets/img/seta-dir-hor.png'
      : './src/assets/img/seta-dir-anti.png'
  );
  divMidCenter.append(arrowLeftImg, discardFieldImg, arrowRightImg);
  divMidSide.appendChild(divMidCenter);

  const divMidBottom = document.createElement('div');
  divMidBottom.classList.add('gp__mid-bottom');
  createUserDeck(divMidBottom, player4, 'vertical', 'bottom');
  createUserInfoT(divMidBottom, player4, 'bottom', room.positionActive, room.startLastTurnAt);
  divMidSide.appendChild(divMidBottom);

  //Lado direito do jogo
  const divRightSide = document.createElement('div');
  divRightSide.classList.add('gp__right-side');
  createUserDeck(divRightSide, player3, 'horizontal', 'right');
  createUserInfoT(divRightSide, player3, 'right', room.positionActive, room.startLastTurnAt);

  //Pilha de cartas
  const imgLot = document.createElement('img');
  imgLot.classList.add('gp__card-vertical');
  imgLot.id = 'gp__lot';
  imgLot.setAttribute('src', './src/assets/img/verso-carta-vertical.png');
  imgLot.addEventListener('click', () => {
    Globals.serverCommunication.playTurn('', '');
  });

  //Botão de voltar
  const imgBackBtn = document.createElement('img');
  imgBackBtn.id = 'gp__back-btn';
  imgBackBtn.setAttribute('src', './src/assets/img/back-icon.png');
  imgBackBtn.addEventListener('click', () => {
    Globals.serverCommunication.leaveRoom();
    //navigate('roomOptions')
  });

  //Botões de som e sair
  const divBtn = document.createElement('div');
  divBtn.classList.add('gp__right-btns');
  const imgSoundBtn = document.createElement('img');
  imgSoundBtn.id = 'gp__sound-btn';

  const audio = document.getElementById('audio-background');

  if (audio.paused) {
    imgSoundBtn.src = './src/assets/img/mute.png';
  } else {
    imgSoundBtn.src = './src/assets/img/button-sound.png';
  }

  imgSoundBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.volume = 0.1;
      audio.play();
      audio.loop = true;
      imgSoundBtn.src = './src/assets/img/button-sound.png';
    } else {
      audio.pause();
      imgSoundBtn.src = './src/assets/img/mute.png';
    }
  });

  const imgCloseBtn = document.createElement('img');
  imgCloseBtn.id = 'gp__close-btn';
  imgCloseBtn.setAttribute('src', './src/assets/img/button-close.png');
  imgCloseBtn.addEventListener('click', () => {
    window.location.reload();
  });

  divBtn.append(imgSoundBtn, imgCloseBtn);

  mainTag.append(divLeftSide, divMidSide, divRightSide, imgLot, imgBackBtn, divBtn);
  page.append(mainTag);
};

function createUserInfoT(container, player, side, positionRoom, startLastTurnAt) {
  const divUserInfo = document.createElement('div');
  divUserInfo.classList.add('gp__user-info');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('gp__avatar');
  avatarImg.setAttribute('src', player.avatar);

  const userTextDiv = document.createElement('div');
  userTextDiv.classList.add('gp__user-text-info');

  const usernamePlayerLeftSpanTag = document.createElement('span');
  usernamePlayerLeftSpanTag.classList.add('gp__username');
  usernamePlayerLeftSpanTag.innerText = player.username;

  const scoreSpanTag = document.createElement('span');
  scoreSpanTag.classList.add('gp__score-user');
  scoreSpanTag.innerText = player.score;
  userTextDiv.append(usernamePlayerLeftSpanTag, scoreSpanTag);

  if (positionRoom === player.order) {
    avatarImg.classList.add("gp__player-turn");
    const timeToPlaySpanTag = document.createElement('span');
    timeToPlaySpanTag.classList.add('gp__time-to-play');
    timeToPlaySpanTag.innerText = '0:12';

    userTextDiv.append(timeToPlaySpanTag);

    idInterval = setInterval(() => {
      const time = new Date(startLastTurnAt).getTime() - new Date().getTime();
      const minutes = parseInt(time / (1000 * 60));
      const seconds = parseInt((time % (1000 * 60)) / 1000);
      timeToPlaySpanTag.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;
    }, 1000);
  }

  if (side === 'left') {
    divUserInfo.append(userTextDiv, avatarImg);
  } else {
    divUserInfo.append(avatarImg, userTextDiv);
  }
  container.append(divUserInfo);
}

function createUserDeck(container, player, align, position) {
  const divUserDeck = document.createElement('div');
  divUserDeck.classList.add('gp__user-cards');
  for (let i = 0; i < player.numberCards; i++) {
    const cardsUser2Card2 = document.createElement('img');
    if (align === 'horizontal') {
      cardsUser2Card2.classList.add('gp__card-horizontal');
      cardsUser2Card2.style.marginTop = '-30px';
    } else {
      cardsUser2Card2.classList.add('gp__card-vertical');
      divUserDeck.classList.add('gp__deck-horizontal');
      cardsUser2Card2.style.marginLeft = '-30px';
    }
    if (position === 'left') {
      cardsUser2Card2.setAttribute('src', './src/assets/img/verso-carta-left.png');
    } else if (position === 'right') {
      cardsUser2Card2.setAttribute('src', './src/assets/img/verso-carta-right.png');
    } else if (position === 'top') {
      cardsUser2Card2.setAttribute('src', './src/assets/img/verso-carta-top.png');
    } else {
      cardsUser2Card2.setAttribute('src', getImgCard(player.cards[i].color, player.cards[i].value));
      cardsUser2Card2.classList.add('gp__principal-player');
      cardsUser2Card2.addEventListener('click', () => {
        if (player.cards[i].value === 'm4' || player.cards[i].value === 's1') {
          Modal.showChooseColorModal((color) => {
            Globals.serverCommunication.playTurn(color, player.cards[i].value);
          });
        } else {
          Globals.serverCommunication.playTurn(player.cards[i].color, player.cards[i].value);
        }
      });
    }
    divUserDeck.appendChild(cardsUser2Card2);
  }
  container.append(divUserDeck);
}

export { renderGamePage };
