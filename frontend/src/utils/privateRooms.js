import { Modal } from './modal.js';
import { Globals } from './globals.js';

const renderPrivateRooms = async () => {
  const roonsPrivates = await Globals.serverCommunication.getRoomsPrivate();
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
      Modal.showEnterRoomModal(`${item.name} (${item.numberPlayers}/4)`, (password) => {});
    });
    e_5.appendChild(e_8);
    e_4.appendChild(e_5);
  });

  e_2.appendChild(e_4);
  var e_17 = document.createElement('button');
  e_17.setAttribute('type', 'button');
  e_17.appendChild(document.createTextNode('Criar sala'));
  e_17.addEventListener('click', () => {
    Modal.showCreateRoomModal((name, password) => {
      Globals.serverCommunication.createRoomPrivate(name, password);
    });
  });
  e_2.appendChild(e_17);
  e_0.appendChild(e_2);
  const page = document.getElementById('page');
  page.append(e_0);
};

export { renderPrivateRooms };
