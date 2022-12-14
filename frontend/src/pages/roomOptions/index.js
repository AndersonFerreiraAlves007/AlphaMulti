import { navigate } from '../../utils/navigate.js';
import { Globals } from '../../utils/globals.js';
import { SoundPlayer } from '../../utils/sound.js';

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

  if (!Globals.soundStatus) {
    btnSound.src = './src/assets/img/mute.png';
  } else {
    btnSound.src = './src/assets/img/button-sound.png';
  }

  btnSound.addEventListener('click', () => {
    if (!Globals.soundStatus) {
      btnSound.src = './src/assets/img/button-sound.png';
    } else {
      btnSound.src = './src/assets/img/mute.png';
    }
    SoundPlayer.toogleStatusAllAudios()
  });

  const btnClose = document.createElement('img');
  btnClose.classList.add('button__close');
  btnClose.src = './src/assets/img/button-close.png';
  btnClose.addEventListener('click', () => {
    SoundPlayer.click()
    window.location.reload();
  });
  divButtons.append(btnSound, btnClose);

  const imgCards = document.createElement('img');
  imgCards.classList.add('img__cards');
  imgCards.src = './src/assets/img/cartas-room.png';

  const imglogo = document.createElement('img');
  imglogo.classList.add('room--logo');

  const title = document.createElement('p');
  title.innerText = 'Escolha uma opção';

  const divRooms = document.createElement('div');
  divRooms.classList.add('rooms');
  const divRoom1 = document.createElement('div');
  const room1Title = document.createElement('p');
  room1Title.innerText = 'Salas Públicas';
  const room1Img = document.createElement('img');
  room1Img.src = './src/assets/img/public-room.svg';
  divRoom1.append(room1Title, room1Img);

  divRoom1.addEventListener('click', () => {
    SoundPlayer.click()
    navigate('publicRooms');
  });

  const divRoom2 = document.createElement('div');
  const room2Title = document.createElement('p');
  room2Title.innerText = 'Salas Privadas';
  const room2Img = document.createElement('img');
  room2Img.src = './src/assets/img/private-room.svg';
  divRoom2.append(room2Title, room2Img);

  divRoom2.addEventListener('click', () => {
    SoundPlayer.click()
    navigate('privateRooms');
  });

  divRooms.append(divRoom1, divRoom2);
  main.append(imglogo, title, divRooms);
  roomFistPage.append(imgBackground, divButtons, main, imgCards);
  page.append(roomFistPage);
};

export { renderRoomOptions };
