import { Modal } from './modal.js';
import { Globals } from './globals.js';

const renderPrivateRooms = async () => {
  const roonsPrivates = await Globals.serverCommunication.getRoomsPrivate();
<<<<<<< HEAD
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

  const divLogo = document.createElement('div');
  divLogo.classList.add('div__logo--private');
  const logo = document.createElement('img');
  logo.classList.add('img__logo--private');
  logo.setAttribute('src', './src/assets/img/logo.png');
  divLogo.append(logo);
  divInfo.append(divLogo);

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
=======
  var e_0 = document.createElement('main');
  e_0.setAttribute('class', 'privateRooms');
  var e_1 = document.createElement('img');
  e_1.setAttribute('class', 'backgroud');
  e_1.setAttribute('src', './src/assets/img/background.png');
  e_0.appendChild(e_1);
  var e_2 = document.createElement('div');
  e_2.setAttribute('class', 'inforRoom');
  var e_3 = document.createElement('h1');
  e_3.appendChild(document.createTextNode('Salas Privadas'));
  e_2.appendChild(e_3);
  var e_4 = document.createElement('div');
  e_4.setAttribute('class', 'roomAll');

  roonsPrivates.forEach((item) => {
    var e_5 = document.createElement('div');
    e_5.setAttribute('class', 'roomCard');
    var e_6 = document.createElement('h3');
    e_6.appendChild(document.createTextNode(`${item.name} (${item.numberPlayers}/4)`));
    e_5.appendChild(e_6);
    var e_7 = document.createElement('h4');
    e_7.appendChild(document.createTextNode(`Código: ${item.code}`));
    e_5.appendChild(e_7);
    var e_8 = document.createElement('button');
    e_8.setAttribute('type', 'button');
    e_8.appendChild(document.createTextNode('Entrar'));
    e_8.addEventListener('click', () => {
>>>>>>> manu
      Modal.showEnterRoomModal(`${item.name} (${item.numberPlayers}/4)`, (password) => {
        Globals.serverCommunication.enterPrivateRoom(item.id, password);
      });
    });
<<<<<<< HEAD
    roomCard.append(enterBtn);
    divRooms.append(roomCard);
  });

  divInfo.append(divRooms);
  const createRoom = document.createElement('button');
  createRoom.setAttribute('type', 'button');
  createRoom.append(document.createTextNode('Criar sala'));
  createRoom.addEventListener('click', () => {
=======
    e_5.appendChild(e_8);
    e_4.appendChild(e_5);
  });

  e_2.appendChild(e_4);
  var e_17 = document.createElement('button');
  e_17.setAttribute('type', 'button');
  e_17.appendChild(document.createTextNode('Criar sala'));
  e_17.addEventListener('click', () => {
>>>>>>> manu
    Modal.showCreateRoomModal((name, password) => {
      Globals.serverCommunication.createRoomPrivate(name, password);
    });
  });
<<<<<<< HEAD
  divInfo.append(createRoom);
  main.append(divInfo);
  page.append(main, divButtons, imgCards);
=======
  e_2.appendChild(e_17);
  e_0.appendChild(e_2);
  const page = document.getElementById('page');
  page.append(e_0);
>>>>>>> manu
};

export { renderPrivateRooms };
