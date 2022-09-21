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
  backLogin.classList.add('back__login');
  backLogin.setAttribute('src', './src/assets/img/background.png');

  const cartasLogin = document.createElement('img');
  cartasLogin.classList.add('cartas__login');
  cartasLogin.setAttribute('src', './src/assets/img/cartas-login.png');

  const buttonsCofigure = document.createElement('div');
  buttonsCofigure.classList.add('buttons__configure--loginPage');

  const buttonSound = document.createElement('input');
  const audio = document.getElementById('audio-background');
  buttonSound.classList.add('button__sound');
  buttonSound.setAttribute('type', 'image');

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

  const buttosClose = document.createElement('input');
  buttosClose.classList.add('button__close');
  buttosClose.setAttribute('type', 'image');
  buttosClose.setAttribute('src', './src/assets/img/button-close.png');
  buttosClose.addEventListener('click', () => {
    window.location.reload();
  });

  buttonsCofigure.append(buttonSound, buttosClose);

  const divLogoLogin = document.createElement('div');
  divLogoLogin.classList.add('div__logo__login');

  const logoLogin = document.createElement('img');
  logoLogin.classList.add('logo__login');
  // logoLogin.setAttribute('src', './src/assets/img/logo.png');

  divLogoLogin.append(logoLogin);

  const containerPaiLogin = document.createElement('div');
  containerPaiLogin.classList.add('container__pai__login');

  const containerBlue = document.createElement('img');
  containerBlue.classList.add('container__blue');
  containerBlue.setAttribute('src', './src/assets/img/back-login.png');

  const containerLogin = document.createElement('div');
  containerLogin.classList.add('container__login');

  const inputLogin = document.createElement('input');
  inputLogin.classList.add('input__login');
  inputLogin.setAttribute('type', 'text');
  inputLogin.setAttribute('placeholder', 'Insira seu nome');

  const containerUsuario = document.createElement('div');
  containerUsuario.classList.add('container__usuario');

  const imgUsuario = document.createElement('img');
  imgUsuario.classList.add('img__usuario');
  imgUsuario.setAttribute('src', './src/assets/img/users/user1.svg');

  const buttonEsquerda = document.createElement('input');
  buttonEsquerda.classList.add('button__esquerda');
  buttonEsquerda.setAttribute('type', 'image');
  buttonEsquerda.setAttribute('src', './src/assets/img/button-esquerda.svg');
  buttonEsquerda.addEventListener('click', () => {
    if (indexAvatar === 0) indexAvatar = 9;
    else indexAvatar = indexAvatar - 1;
    imgUsuario.setAttribute('src', avatares[indexAvatar]);
  });

  const buttonDireita = document.createElement('input');
  buttonDireita.classList.add('button__direita');
  buttonDireita.setAttribute('type', 'image');
  buttonDireita.setAttribute('src', './src/assets/img/button-direita.svg');
  buttonDireita.addEventListener('click', () => {
    if (indexAvatar === 9) indexAvatar = 0;
    else indexAvatar = indexAvatar + 1;
    imgUsuario.setAttribute('src', avatares[indexAvatar]);
  });

  const buttonPlay = document.createElement('input');
  buttonPlay.classList.add('button__play');
  buttonPlay.setAttribute('type', 'image');
  buttonPlay.setAttribute('src', './src/assets/img/button-play.svg');
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
    navigate('roomOptions');
  });

  containerUsuario.append(buttonEsquerda, imgUsuario, buttonDireita);

  containerLogin.append(inputLogin, containerUsuario, buttonPlay);

  containerPaiLogin.append(containerBlue, containerLogin);

  main.append(backLogin, cartasLogin, buttonsCofigure, divLogoLogin, containerPaiLogin);

  document.getElementById('page').append(main);

  /*  document.getElementById('page').innerHTML = `
    <main>
      <img class="back__login" src="./src/assets/img/background.png">
      <img class="cartas__login" src="./src/assets/img/cartas-login.png">
      <div class="buttons__configure">
        <input class="button__sound" type="image" src="./src/assets/img/button-sound.png"> 
        <input class="button__close" type="image" src="./src/assets/img/button-close.png">  
      </div>
      <div class="div__logo__login">
        <img class="logo__login" src="./src/assets/img/logo.png">
      </div>
      <div class="container__pai__login">
        <img class="container__blue" src="./src/assets/img/back-login.png">
        <div class="container__login">
          <input type="text" class="input__login" placeholder="Insira seu nome">
          <div class="container__usuario">
            <input class="button__esquerda" type="image" src="./src/assets/img/button-esquerda.svg"> 
            <img class="img__usuario" src="./src/assets/img/users/user1.svg"> 
            <input class="button__direita" type="image" src="./src/assets/img/button-direita.svg">  
          </div>
          <input class="button__play" type="image" src="./src/assets/img/button-play.svg">  
        </div>  
      </div>
    </main>  
  ` */
};

export { renderLoginPage };
