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
  avatar: '../../assets/img/users/user1.svg',
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
      avatar: '../../assets/img/users/user1.svg',
    },
    {
      id: 2,
      username: 'Adriana',
      numberCards: 7,
      score: 1000,
      order: 2,
      isBot: false,
      avatar: '../../assets/img/users/user2.svg',
    },
    {
      id: 3,
      username: 'Manu',
      numberCards: 7,
      score: 1000,
      order: 3,
      isBot: false,
      avatar: '../../assets/img/users/user3.svg',
    },
    {
      id: 4,
      username: 'Brenda',
      numberCards: 1,
      score: 1000,
      order: 4,
      isBot: false,
      avatar: '../../assets/img/users/user4.svg',
    },
  ],
};

function getImgCard(color, value) {
  if (value === 'm4') return '../../assets/img/cards/special/m4.svg';
  if (value === 's1') return '../../assets/img/cards/special/s1.svg';
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
  }
  return `../../assets/img/cards/${folder}/${value}.svg`;
}

let idInterval;

const renderGamePage = () => {

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

  //const page = document.getElementById('page');

  const main = document.querySelector('main');
  //page.append(main);

  //const purchaseDeck = document.createElement('img');
  purchaseDeck.classList.add('card', 'img__deck');
  purchaseDeck.src = '../../assets/img/verso-carta.png';
  main.append(purchaseDeck);
  purchaseDeck.addEventListener('click', () => {
    console.log('deck');
  });

 /*  const background = document.createElement('img');
  background.classList.add('background');
  background.setAttribute('src', '../../assets/img/background.png'); */
  //main.append(background);

  const buttonsConfigure = document.createElement('div');
  buttonsConfigure.classList.add('buttons__configure');
  main.append(buttonsConfigure);

  const buttonSound = document.createElement('input');
  buttonSound.classList.add('button__sound');
  buttonSound.setAttribute('type', 'image');
  buttonSound.setAttribute('src', '../../assets/img/button-sound.png');
  buttonsConfigure.append(buttonSound);

  const buttonClose = document.createElement('input');
  buttonClose.classList.add('button__close');
  buttonClose.setAttribute('type', 'image');
  buttonClose.setAttribute('src', '../../assets/img/button-close.png');
  buttonsConfigure.append(buttonClose);

  const btnBack = document.createElement('img');
  btnBack.classList.add('button__back');
  btnBack.src = '../../assets/img/back-icon.svg';
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
  cardsUser1Card1.setAttribute('src', '../../assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card1)

  const cardsUser1Card2 = document.createElement('img');
  cardsUser1Card2.classList.add('card', 'overflowA2')
  cardsUser1Card2.setAttribute('src', '../../assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card2)

  const cardsUser1Card3 = document.createElement('img');
  cardsUser1Card3.classList.add('card', 'overflowA3')
  cardsUser1Card3.setAttribute('src', '../../assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card3)

  const cardsUser1Card4 = document.createElement('img');
  cardsUser1Card4.classList.add('card', 'overflowA4')
  cardsUser1Card4.setAttribute('src', '../../assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card4)

  const cardsUser1Card5 = document.createElement('img');
  cardsUser1Card5.classList.add('card', 'overflowA5')
  cardsUser1Card5.setAttribute('src', '../../assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card5)

  const cardsUser1Card6 = document.createElement('img');
  cardsUser1Card6.classList.add('card', 'overflowA6')
  cardsUser1Card6.setAttribute('src', '../../assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card6)

  const cardsUser1Card7 = document.createElement('img');
  cardsUser1Card7.classList.add('card', 'overflowA7')
  cardsUser1Card7.setAttribute('src', '../../assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card7) */

  for (let i = 1; i <= player1.numberCards; i++) {
    const cardsUser1Card1 = document.createElement('img');
    cardsUser1Card1.classList.add('card', `overflowA${i > 1 ? `${i}` : ''}`);
    cardsUser1Card1.setAttribute('src', '../../assets/img/verso-carta.png');
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
  cardsUser2Card1.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card1)

  const cardsUser2Card2 = document.createElement('img');
  cardsUser2Card2.classList.add('card', 'overflowY2')
  cardsUser2Card2.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card2)

  const cardsUser2Card3 = document.createElement('img');
  cardsUser2Card3.classList.add('card', 'overflowY3')
  cardsUser2Card3.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card3)

  const cardsUser2Card4 = document.createElement('img');
  cardsUser2Card4.classList.add('card', 'overflowY4')
  cardsUser2Card4.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card4)

  const cardsUser2Card5 = document.createElement('img');
  cardsUser2Card5.classList.add('card', 'overflowY5')
  cardsUser2Card5.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card5)

  const cardsUser2Card6 = document.createElement('img');
  cardsUser2Card6.classList.add('card', 'overflowY6')
  cardsUser2Card6.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card6)

  const cardsUser2Card7 = document.createElement('img');
  cardsUser2Card7.classList.add('card', 'overflowY7')
  cardsUser2Card7.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card7) */

  for (let i = 1; i <= player2.numberCards; i++) {
    const cardsUser2Card1 = document.createElement('img');
    cardsUser2Card1.classList.add('card', `overflowY${i > 1 ? `${i}` : ''}`);
    cardsUser2Card1.setAttribute('src', '../../assets/img/verso-carta.png');
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
  cardsUser3Card1.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card1)

  const cardsUser3Card2 = document.createElement('img');
  cardsUser3Card2.classList.add('card', 'overflowZ2')
  cardsUser3Card2.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card2)

  const cardsUser3Card3 = document.createElement('img');
  cardsUser3Card3.classList.add('card', 'overflowZ3')
  cardsUser3Card3.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card3)

  const cardsUser3Card4 = document.createElement('img');
  cardsUser3Card4.classList.add('card', 'overflowZ4')
  cardsUser3Card4.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card4)

  const cardsUser3Card5 = document.createElement('img');
  cardsUser3Card5.classList.add('card', 'overflowZ5')
  cardsUser3Card5.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card5)

  const cardsUser3Card6 = document.createElement('img');
  cardsUser3Card6.classList.add('card', 'overflowZ6')
  cardsUser3Card6.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card6)

  const cardsUser3Card7 = document.createElement('img');
  cardsUser3Card7.classList.add('card', 'overflowZ7')
  cardsUser3Card7.setAttribute('src', '../../assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card7) */

  for (let i = 1; i <= player3.numberCards; i++) {
    const cardsUser2Card1 = document.createElement('img');
    cardsUser2Card1.classList.add('card', `overflowZ${i > 1 ? `${i}` : ''}`);
    cardsUser2Card1.setAttribute('src', '../../assets/img/verso-carta.png');
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
  cardsUser4Card1.setAttribute('src', '../../assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card1)

  const cardsUser4Card2 = document.createElement('img');
  cardsUser4Card2.classList.add('card', 'overflowB2')
  cardsUser4Card2.setAttribute('src', '../../assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card2)

  const cardsUser4Card3 = document.createElement('img');
  cardsUser4Card3.classList.add('card', 'overflowB3')
  cardsUser4Card3.setAttribute('src', '../../assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card3)

  const cardsUser4Card4 = document.createElement('img');
  cardsUser4Card4.classList.add('card', 'overflowB4')
  cardsUser4Card4.setAttribute('src', '../../assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card4)

  const cardsUser4Card5 = document.createElement('img');
  cardsUser4Card5.classList.add('card', 'overflowB5')
  cardsUser4Card5.setAttribute('src', '../../assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card5)

  const cardsUser4Card6 = document.createElement('img');
  cardsUser4Card6.classList.add('card', 'overflowB6')
  cardsUser4Card6.setAttribute('src', '../../assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card6)

  const cardsUser4Card7 = document.createElement('img');
  cardsUser4Card7.classList.add('card', 'overflowB7')
  cardsUser4Card7.setAttribute('src', '../../assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card7) */

  for (let i = 0; i < player4.cards.length; i++) {
    const cardsUser2Card1 = document.createElement('img');
    cardsUser2Card1.classList.add('card', `overflowB${i + 1 > 1 ? `${i + 1}` : ''}`, 'card-player');
    cardsUser2Card1.setAttribute('src', getImgCard(player4.cards[i].color, player4.cards[i].value));
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
     <img class="background" src="../../assets/img/background.png">
     <div class="buttons__configure">
       <input class="button__sound" type="image" src="../../assets/img/button-sound.png">
       <input class="button__close" type="image" src="../../assets/img/button-close.png">
     </div>
     <div class="info__user--perfil">
       <img class="foto" src="../../assets/img/users/user1.svg">
       <h2 class="">Kenji</h2>
       <h3 class="time__user">0:10</h3>
     </div>
     <div class="row alinhamento2 translate">
       <img class="card overflowA" src="../../assets/img/verso-carta.png">
       <img class="card overflowA2" src="../../assets/img/verso-carta.png">
       <img class="card overflowA3" src="../../assets/img/verso-carta.png">
       <img class="card overflowA4" src="../../assets/img/verso-carta.png">
       <img class="card overflowA5" src="../../assets/img/verso-carta.png">
       <img class="card overflowA6" src="../../assets/img/verso-carta.png">
       <img class="card overflowA7" src="../../assets/img/verso-carta.png">
     </div>
     <div class="columnT alinhamento">
       <div class="teste">
         <div class="info__user--perfil">
           <img class="foto" src="../../assets/img/users/user7.svg">
           <h2 class="">Ichigo</h2>
           <h3 class="time__user">0:10</h3>
         </div>
         <div class="column esquerda">
           <img class="card overflowY" src="../../assets/img/verso-carta.png">
           <img class="card overflowY2" src="../../assets/img/verso-carta.png">
           <img class="card overflowY3" src="../../assets/img/verso-carta.png">
           <img class="card overflowY4" src="../../assets/img/verso-carta.png">
           <img class="card overflowY5" src="../../assets/img/verso-carta.png">
           <img class="card overflowY6" src="../../assets/img/verso-carta.png">
           <img class="card overflowY7" src="../../assets/img/verso-carta.png">
         </div>
       </div>
       <div class="carta-meio">
         <img class="carta-lixo" src="../../assets/img/cards/red/3.svg">
       </div>
       <div class="teste">
         <div class="column direita">
           <img class="card overflowZ" src="../../assets/img/verso-carta.png">
           <img class="card overflowZ2" src="../../assets/img/verso-carta.png">
           <img class="card overflowZ3" src="../../assets/img/verso-carta.png">
           <img class="card overflowZ4" src="../../assets/img/verso-carta.png">
           <img class="card overflowZ5" src="../../assets/img/verso-carta.png">
           <img class="card overflowZ6" src="../../assets/img/verso-carta.png">
           <img class="card overflowZ7" src="../../assets/img/verso-carta.png">
         </div>
         <div class="info__user--perfil">
           <img class="foto" src="../../assets/img/users/user5.svg">
           <h2 class="">Naruto</h2>
           <h3 class="time__user">0:10</h3>
         </div>
       </div>
     </div>
     <div class="user__four">
       <div class="translate2">
         <img class="card overflowB" src="../../assets/img/verso-carta.png">
         <img class="card overflowB2" src="../../assets/img/verso-carta.png">
         <img class="card overflowB3" src="../../assets/img/verso-carta.png">
         <img class="card overflowB4" src="../../assets/img/verso-carta.png">
         <img class="card overflowB5" src="../../assets/img/verso-carta.png">
         <img class="card overflowB6" src="../../assets/img/verso-carta.png">
         <img class="card overflowB7" src="../../assets/img/verso-carta.png">
       </div>
       <div class="info__user--perfil">
         <img class="foto" src="../../assets/img/users/user10.svg">
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

renderGamePage();
