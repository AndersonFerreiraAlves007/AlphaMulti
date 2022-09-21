import { navigate } from './navigate.js';
import { Globals } from './globals.js';

const renderRoomOptions = () => {
  const page = document.getElementById('page');

  const roomFistPage = document.createElement('div');
  roomFistPage.classList.add('room--first--page');

  const main = document.createElement('main');
  main.classList.add('main__room');

  const imgBackground = document.createElement('img');
  imgBackground.classList.add('background');
  imgBackground.src = './src/assets/img/background.png';

  const divButtons = document.createElement('div');
  divButtons.classList.add('buttons__configure');
  const btnSound = document.createElement('input');
  btnSound.classList.add('button__sound');
  btnSound.setAttribute('type', 'image');
  btnSound.src = './src/assets/img/mute.png';
  btnSound.addEventListener('click', () => {
    const audio = document.getElementById('audio-background');
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

  const btnClose = document.createElement('img');
  btnClose.classList.add('button__close');
  btnClose.src = './src/assets/img/button-close.png';
  btnClose.addEventListener('click', () => {
    window.location.reload();
  });
  divButtons.append(btnSound, btnClose);

  const imgCards = document.createElement('img');
  imgCards.classList.add('img__cards');
  imgCards.src = './src/assets/img/cartas-room.png';

  const imglogo = document.createElement('img');
  imglogo.classList.add('room--logo');
  // imglogo.src = './src/assets/img/logo.png';

  const title = document.createElement('p');
  title.innerText = 'Escolha uma opção';

  const divRooms = document.createElement('div');
  divRooms.classList.add('rooms');
  const divRoom1 = document.createElement('div');
  const room1Title = document.createElement('p');
  room1Title.innerText = 'Salas Aleatórias';
  const room1Img = document.createElement('img');
  room1Img.src = './src/assets/img/public-room.svg';
  divRoom1.append(room1Title, room1Img);

  divRoom1.addEventListener('click', () => {
    divRoom1.style.pointerEvents = 'none';
    Globals.serverCommunication.enterRadomRoom();
  });

  const divRoom2 = document.createElement('div');
  const room2Title = document.createElement('p');
  room2Title.innerText = 'Salas Privadas';
  const room2Img = document.createElement('img');
  room2Img.src = './src/assets/img/private-room.svg';
  divRoom2.append(room2Title, room2Img);

  divRoom2.addEventListener('click', () => {
    navigate('privateRooms');
  });

  divRooms.append(divRoom1, divRoom2);
  main.append(imglogo, title, divRooms);
  roomFistPage.append(imgBackground, divButtons, main, imgCards);
  page.append(roomFistPage);
};

export { renderRoomOptions };
