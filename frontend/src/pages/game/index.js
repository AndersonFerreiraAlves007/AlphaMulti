import { Globals } from '../../utils/globals.js';
import { Modal } from '../../utils/modal.js';
import { SoundPlayer } from '../../utils/sound.js';

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

const renderGamePage = () => {
  SoundPlayer.nextTurn()
  SoundPlayer.pushCard()
  clearInterval(idInterval);
  Globals.player.numberCards = Globals.player.cards.length;
  const player = Globals.player;
  const room = Globals.room;

  const orderPlayer = player.order;

  room.players.sort((a, b) => a.order - b.order);

  const players = room.players;

  const playerIndex = players.findIndex((item) => item.order === orderPlayer);

  let index = playerIndex;

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
    SoundPlayer.click()
    Globals.serverCommunication.leaveRoom();
    //navigate('roomOptions')
  });

  //Botões de som e sair
  const divBtn = document.createElement('div');
  divBtn.classList.add('gp__right-btns');
  const imgSoundBtn = document.createElement('img');
  imgSoundBtn.id = 'gp__sound-btn';

  if (!Globals.soundStatus) {
    imgSoundBtn.src = './src/assets/img/mute.png';
  } else {
    imgSoundBtn.src = './src/assets/img/button-sound.png';
  }

  imgSoundBtn.addEventListener('click', () => {
    if (!Globals.soundStatus) {
      imgSoundBtn.src = './src/assets/img/button-sound.png';
    } else {
      imgSoundBtn.src = './src/assets/img/mute.png';
    }
    SoundPlayer.toogleStatusAllAudios()
  });

  const imgCloseBtn = document.createElement('img');
  imgCloseBtn.id = 'gp__close-btn';
  imgCloseBtn.setAttribute('src', './src/assets/img/button-close.png');
  imgCloseBtn.addEventListener('click', () => {
    SoundPlayer.click()
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
      let minutes = parseInt(time / (1000 * 60));
      minutes = minutes >= 0 ? minutes : 0 
      let seconds = parseInt((time % (1000 * 60)) / 1000);
      seconds = seconds >= 0 ? seconds : 0
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
        SoundPlayer.click()
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
