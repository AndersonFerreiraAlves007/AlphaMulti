import { Modal } from './modal.js';
import { Globals } from './globals.js';

const renderPublicRooms = async () => {
  const roonsPrivates = await Globals.serverCommunication.getRoomsPublic();
  const page = document.getElementById('page');
  const main = document.createElement('main');
  main.classList.add('privateRooms');

  const background = document.createElement('img');
  background.classList.add('backgroud');
  background.src = './src/assets/img/background.png';
  main.append(background);

  const divButtons = document.createElement('div');
  divButtons.classList.add('buttons__configure');
  const btnSound = document.createElement('img');
  const audio = document.getElementById('audio-background');
  btnSound.classList.add('button__sound');

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

  const divInfo = document.createElement('div');
  divInfo.classList.add('inforRoom');

  /* const divLogo = document.createElement('div');
  divLogo.classList.add('div__logo--private');
  const logo = document.createElement('img');
  logo.classList.add('img__logo--private');
  logo.setAttribute('src', './src/assets/img/logo.png');
  divLogo.append(logo);
  divInfo.append(divLogo); */

  const title = document.createElement('h1');
  title.append(document.createTextNode('Salas Públicas'));
  divInfo.append(title);

  const divRooms = document.createElement('div');
  divRooms.classList.add('roomAll');

  roonsPrivates.forEach((item) => {
    const roomCard = document.createElement('div');
    roomCard.classList.add('roomCard');
    const roomName = document.createElement('h3');
    roomName.append(document.createTextNode(`Jogadores ${item.name} (${item.numberPlayers}/4)`));
    roomCard.append(roomName);
    const roomCode = document.createElement('h4');
    roomCode.append(document.createTextNode(`Código: ${item.code}`));
    roomCard.append(roomCode);
    const enterBtn = document.createElement('button');
    enterBtn.append(document.createTextNode('Entrar'));
    enterBtn.addEventListener('click', () => {
      Globals.serverCommunication.enterPublicRoom(item.id);
    });
    roomCard.append(enterBtn);
    divRooms.append(roomCard);
  });

  divInfo.append(divRooms);
  const createRoom = document.createElement('button');
  createRoom.setAttribute('type', 'button');
  createRoom.append(document.createTextNode('Criar sala'));
  createRoom.addEventListener('click', () => {
    Modal.showCreateRoomPublicModal((name) => {
      Globals.serverCommunication.createRoomPublic(name);
    });
  });
  divInfo.append(createRoom);
  main.append(divInfo);
  page.append(main, divButtons, imgCards);
};

export { renderPublicRooms };
