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
      numberCards: 7,
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
      numberCards: 7,
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
  const player4 = players[index];
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

  const userLeftCards = document.querySelector(".left-side > .user-cards");
  for (let i = 0; i < player2.numberCards; i++) {
    const cardsUser2Card2 = document.createElement('img');
    cardsUser2Card2.classList.add('card-horizontal');
    //cardsUser1Card1.style.transform = "rotate(90deg)";
    cardsUser2Card2.style.marginTop = "-30px";
    cardsUser2Card2.setAttribute('src', '../../assets/img/verso-carta-left.png');
    userLeftCards.append(cardsUser2Card2);
  }

  const userLeftInfo = document.querySelector(".left-side > .user-info");

  createUserInfo(userLeftInfo, player2, "left");
  //createUserCards()

  const userTopInfo = document.querySelector(".mid-top > .user-info");
  createUserInfo(userTopInfo, player3);

  const userTopCards = document.querySelector(".mid-top > .user-cards");
  for (let i = 0; i < player3.numberCards; i++) {
    const cardsUser2Card2 = document.createElement('img');
    cardsUser2Card2.classList.add('card-vertical');
    //cardsUser1Card1.style.transform = "rotate(90deg)";
    cardsUser2Card2.style.marginLeft = "-30px";
    cardsUser2Card2.setAttribute('src', '../../assets/img/verso-carta-top.png');
    userTopCards.append(cardsUser2Card2);
  }

  const userBottomInfo = document.querySelector(".mid-bottom > .user-info");
  createUserInfo(userBottomInfo, player4);

  const userBottomCards = document.querySelector(".mid-bottom > .user-cards");
  for (let i = 0; i < player4.numberCards; i++) {
    const cardsUser2Card2 = document.createElement('img');
    cardsUser2Card2.classList.add('card-vertical');
    cardsUser2Card2.classList.add('principal-player');
    //cardsUser1Card1.style.transform = "rotate(90deg)";
    cardsUser2Card2.style.marginLeft = "-30px";
    cardsUser2Card2.setAttribute('src', '../../assets/img/verso-carta-vertical.png');
    userBottomCards.append(cardsUser2Card2);
  }

  const userRightInfo = document.querySelector(".right-side > .user-info");
  createUserInfo(userRightInfo, player1);

  const userRightCards = document.querySelector(".right-side > .user-cards");
  for (let i = 0; i < player1.numberCards; i++) {
    const cardsUser2Card2 = document.createElement('img');
    cardsUser2Card2.classList.add('card-horizontal');
    cardsUser2Card2.style.marginTop = "-30px";
    cardsUser2Card2.setAttribute('src', '../../assets/img/verso-carta-right.png');
    userRightCards.append(cardsUser2Card2);
  }

  const midCenter = document.querySelector(".mid-center");
  const arrowLeftImg = document.createElement('img');
  arrowLeftImg.classList.add('left-arrow');
  arrowLeftImg.setAttribute("src", '../../assets/img/seta-esq-hor.png');
  const discardFieldImg = document.createElement('img');
  discardFieldImg.classList.add('card-vertical');
  discardFieldImg.setAttribute("src", '../../assets/img/verso-carta-vertical.png');
  const arrowRightImg = document.createElement('img');
  arrowRightImg.classList.add('right-arrow');
  arrowRightImg.setAttribute("src", '../../assets/img/seta-dir-hor.png');
  midCenter.append(arrowLeftImg, discardFieldImg, arrowRightImg); 
  //const page = document.getElementById('page');

  //const main = document.querySelector('main');
  //page.append(main);

  //const purchaseDeck = document.createElement('img');
  /* purchaseDeck.classList.add('card', 'img__deck');
  purchaseDeck.src = '../../assets/img/verso-carta.png';
  main.append(purchaseDeck);
  purchaseDeck.addEventListener('click', () => {
    console.log('deck');
  }); */

  /* const buttonsConfigure = document.createElement('div');
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
  infoUserPerfil1.append(infoUserPerfil1Foto); */

  /* const infoUserPerfil1H2 = document.createElement('h2');
  infoUserPerfil1H2.innerText = player1.username;
  infoUserPerfil1.append(infoUserPerfil1H2); */

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

  /* const rowAlinhametoTranslate1 = document.createElement('div');
  rowAlinhametoTranslate1.classList.add('row', 'alinhamento2', 'translate');
  main.append(rowAlinhametoTranslate1); */

  /* const userCards = document.querySelector(".user-cards");
  for (let i = 0; i < player1.numberCards; i++) {
    const cardsUser1Card1 = document.createElement('img');
    cardsUser1Card1.classList.add('card');
    cardsUser1Card1.style.top = i*25 + 'px';
    cardsUser1Card1.setAttribute('src', '../../assets/img/verso-carta.png');
    userCards.append(cardsUser1Card1);
  } */

  /* const colunaAlinhamento = document.createElement('div');
  colunaAlinhamento.classList.add('columnT', 'alinhamento');
  main.append(colunaAlinhamento); */

  /* const testeUser1 = document.createElement('div');
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
  }*/
}; 

renderGamePage(); 

function createUserInfo(container, player, side) {
  
  const avatarImg = document.createElement('img');
  avatarImg.classList.add("avatar");
  avatarImg.setAttribute("src", "../../assets/img/users/user1.svg");
  const userTextDiv = document.createElement('div');
  userTextDiv.classList.add("user-text-info");
  const usernamePlayerLeftSpanTag = document.createElement('span');
  usernamePlayerLeftSpanTag.classList.add("username");
  usernamePlayerLeftSpanTag.innerText = player.username;
  const timeToPlaySpanTag = document.createElement('span');
  timeToPlaySpanTag.classList.add("time-to-play");
  timeToPlaySpanTag.innerText = "5:00";
  const scoreSpanTag = document.createElement('span');
  scoreSpanTag.classList.add("score-user");
  scoreSpanTag.innerText = player.score;
  userTextDiv.append(usernamePlayerLeftSpanTag, scoreSpanTag, timeToPlaySpanTag);
  if(side === "left"){
    container.append(userTextDiv, avatarImg);
  } else {
    container.append(avatarImg, userTextDiv);
  }
}
