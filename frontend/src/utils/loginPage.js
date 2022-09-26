import { navigate } from './navigate.js';
import { ServerCommunication } from '../services/ServerComunication.js';
import { Globals } from './globals.js';
import { Modal } from './modal.js';

const avatares = [
  './src/assets/img/users/user1.svg',
  './src/assets/img/users/user2.svg',
  './src/assets/img/users/user3.svg',
  './src/assets/img/users/user4.svg',
  './src/assets/img/users/user5.svg',
  './src/assets/img/users/user6.svg',
  './src/assets/img/users/user7.svg',
  './src/assets/img/users/user8.svg',
  './src/assets/img/users/user9.svg',
  './src/assets/img/users/user10.svg',
];

let indexAvatar = 0;

const renderLoginPage = () => {
  indexAvatar = 0;
  const main = document.createElement('main');
  main.classList.add('login');

  const backLogin = document.createElement('img');
  backLogin.classList.add('background__login');
  backLogin.setAttribute('src', './src/assets/img/background.png');

  const cardsLogin = document.createElement('img');
  cardsLogin.classList.add('cards__login');
  cardsLogin.setAttribute('src', './src/assets/img/cartas-login.png');

  const buttonsConfigure = document.createElement('div');
  buttonsConfigure.classList.add('buttons__configure--loginPage');

  const btnSound = document.createElement('input');
  const audio = document.getElementById('audio-background');
  btnSound.classList.add('button__sound');
  btnSound.setAttribute('type', 'image');

  if (audio.paused) {
    btnSound.src = './src/assets/img/mute.png';
  } else {
    btnSound.src = './src/assets/img/button-sound.png';
  }

  btnSound.addEventListener('click', () => {
    if (audio.paused) {
      audio.volume = 0.1;
      audio.play();
      audio.loop = true;
      btnSound.src = './src/assets/img/button-sound.png';
    } else {
      audio.pause();
      btnSound.src = './src/assets/img/mute.png';
    }
  });

  const btnClose = document.createElement('input');
  btnClose.classList.add('button__close');
  btnClose.setAttribute('type', 'image');
  btnClose.setAttribute('src', './src/assets/img/button-close.png');
  btnClose.addEventListener('click', () => {
    window.location.reload();
  });

  buttonsConfigure.append(btnSound, btnClose);

  // const divLogoLogin = document.createElement('div');
  // divLogoLogin.classList.add('div__logo__login');

  // const logoLogin = document.createElement('img');
  // logoLogin.classList.add('logo__login');
  // logoLogin.setAttribute('src', './src/assets/img/logo.png');

  // divLogoLogin.append(logoLogin);

  // const divLoginBox = document.createElement('div');
  // divLoginBox.classList.add('div__login--box');

  const divContainerBlue = document.createElement('div');
  divContainerBlue.classList.add('div__container--blue');

  const divContainerLogin = document.createElement('div');
  divContainerLogin.classList.add('div__container--login');

  const inputLogin = document.createElement('input');
  inputLogin.classList.add('input__login');
  inputLogin.setAttribute('type', 'text');
  inputLogin.setAttribute('placeholder', 'Insira seu nome');

  const divUser = document.createElement('div');
  divUser.classList.add('div__user');

  const imgUser = document.createElement('img');
  imgUser.classList.add('img__user');
  imgUser.setAttribute('src', './src/assets/img/users/user1.svg');

  const btnLeft = document.createElement('img');
  btnLeft.classList.add('button__left');
  btnLeft.src = './src/assets/img/button-esquerda.svg';
  btnLeft.addEventListener('click', () => {
    if (indexAvatar === 0) indexAvatar = 9;
    else indexAvatar = indexAvatar - 1;
    imgUser.setAttribute('src', avatares[indexAvatar]);
  });

  const btnRight = document.createElement('img');
  btnRight.classList.add('button__right');
  btnRight.src = './src/assets/img/button-direita.svg';
  btnRight.addEventListener('click', () => {
    if (indexAvatar === 9) indexAvatar = 0;
    else indexAvatar = indexAvatar + 1;
    imgUser.setAttribute('src', avatares[indexAvatar]);
  });

  const buttonPlay = document.createElement('img');
  buttonPlay.classList.add('button__play');
  buttonPlay.src = './src/assets/img/button-play.svg';
  buttonPlay.addEventListener('click', () => {
    const username = inputLogin.value;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('avatar', avatares[indexAvatar]);
    Globals.serverCommunication = new ServerCommunication('localhost:3333');
    Globals.serverCommunication.addEventListener('startGame', (data) => {
      const { player, room } = data;
      Globals.player = player;
      Globals.room = room;
      navigate('game');
    });

    Globals.serverCommunication.addEventListener('endGame', (data) => {
      const { winer } = data;
      const playerWiner = Globals.room.players.find((item) => item.id === winer);
      Modal.showVictoryModal(playerWiner, () => {
        navigate('roomOptions');
      });
    });

    Globals.serverCommunication.addEventListener('enterPlayer', (data) => {
      const { player, room } = data;
      Globals.player = player;
      Globals.room = room;
      navigate('waitingRoom');
    });

    Globals.serverCommunication.addEventListener('levePlayer', (data) => {
      const { isPlayerLogged, player, room } = data;
      Globals.player = player;
      Globals.room = room;
      if (isPlayerLogged) {
        navigate('roomOptions');
      } else {
        if (!room.isRun) navigate('waitingRoom');
        else navigate('game');
      }
    });

    Globals.serverCommunication.addEventListener('makeMove', (data) => {
      const { player, room } = data;
      Globals.player = player;
      Globals.room = room;
      navigate('game');
    });

    Globals.serverCommunication.addEventListener('changeRoomsAvaliables', () => {
      switch (Globals.screen) {
        case 'privateRooms':
          navigate('privateRooms');
          break;
        case 'publicRooms':
          navigate('publicRooms');
          break;
      }
    });

    navigate('roomOptions');
  });

  divUser.append(btnLeft, imgUser, btnRight);

  divContainerLogin.append(inputLogin, divUser, buttonPlay);

  divContainerBlue.append(divContainerLogin);

  main.append(backLogin, cardsLogin, buttonsConfigure, divContainerBlue);

  document.getElementById('page').append(main);

  /*  document.getElementById('page').innerHTML = `
    <main>
      <img class="background__login" src="./src/assets/img/background.png">
      <img class="cards__login" src="./src/assets/img/cartas-login.png">
      <div class="buttons__configure">
        <input class="button__sound" type="image" src="./src/assets/img/button-sound.png"> 
        <input class="button__close" type="image" src="./src/assets/img/button-close.png">  
      </div>
      <div class="div__logo__login">
        <img class="logo__login" src="./src/assets/img/logo.png">
      </div>
      <div class="div__login--box">
        <img class="div__container--blue" src="./src/assets/img/back-login.png">
        <div class="div__container--login">
          <input type="text" class="input__login" placeholder="Insira seu nome">
          <div class="div__user">
            <input class="button__left" type="image" src="./src/assets/img/button-esquerda.svg"> 
            <img class="img__user" src="./src/assets/img/users/user1.svg"> 
            <input class="button__right" type="image" src="./src/assets/img/button-direita.svg">  
          </div>
          <input class="button__play" type="image" src="./src/assets/img/button-play.svg">  
        </div>  
      </div>
    </main>  
  ` */
};

export { renderLoginPage };
