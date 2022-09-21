import { Modal } from './modal.js';
import { Globals } from './globals.js';

const renderPrivateRooms = async () => {
  const roonsPrivates = await Globals.serverCommunication.getRoomsPrivate();
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
  btnSound.classList.add('button__sound');
  btnSound.src = './src/assets/img/button-sound.png';
  btnSound.addEventListener('click', () => {
    const audio = document.getElementById('audio-background');
    if (audio.paused) {
      audio.volume = 0.1;
      audio.play();
      audio.loop = true;
    } else {
      audio.pause();
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
  title.append(document.createTextNode('Salas Privadas'));
  divInfo.append(title);

  const divRooms = document.createElement('div');
  divRooms.classList.add('roomAll');

  roonsPrivates.forEach((item) => {
    const roomCard = document.createElement('div');
    roomCard.classList.add('roomCard');
    const roomName = document.createElement('h3');
    roomName.append(document.createTextNode(`${item.name} (${item.numberPlayers}/4)`));
    roomCard.append(roomName);
    const roomCode = document.createElement('h4');
    roomCode.append(document.createTextNode(`Código: ${item.code}`));
    roomCard.append(roomCode);
    const enterBtn = document.createElement('button');
    enterBtn.append(document.createTextNode('Entrar'));
    enterBtn.addEventListener('click', () => {
      Modal.showEnterRoomModal(`${item.name} (${item.numberPlayers}/4)`, (password) => {
        Globals.serverCommunication.enterPrivateRoom(item.id, password);
      });
    });
    roomCard.append(enterBtn);
    divRooms.append(roomCard);
  });

  divInfo.append(divRooms);
  const createRoom = document.createElement('button');
  createRoom.setAttribute('type', 'button');
  createRoom.append(document.createTextNode('Criar sala'));
  createRoom.addEventListener('click', () => {
    Modal.showCreateRoomModal((name, password) => {
      Globals.serverCommunication.createRoomPrivate(name, password);
    });
  });
  divInfo.append(createRoom);
  main.append(divInfo);
  page.append(main, divButtons, imgCards);
};

export { renderPrivateRooms };
