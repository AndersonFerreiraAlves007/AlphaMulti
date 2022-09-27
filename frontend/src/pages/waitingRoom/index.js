import { Globals } from '../../utils/globals.js';
import { SoundPlayer } from '../../utils/sound.js';

let idInterval2;
const renderWaitingRoomPage = () => {
  clearInterval(idInterval2);
  const room = Globals.room;

  const page = document.getElementById('page');
  page.classList.add('waiting--room-page');

  const imgBackground = document.createElement('img');
  imgBackground.classList.add('background');
  imgBackground.src = './src/assets/img/background.png';

  const divButtons = document.createElement('div');
  divButtons.classList.add('buttons__configure--waiting');

  const btnSound = document.createElement('img');
  btnSound.classList.add('button__sound');

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

  const btnBack = document.createElement('img');
  btnBack.classList.add('button__back');
  btnBack.src = './src/assets/img/back-icon.svg';
  btnBack.addEventListener('click', () => {
    SoundPlayer.click()
    Globals.serverCommunication.leaveRoom();
  });

  divButtons.append(btnSound, btnClose, btnBack);

  const main = document.createElement('main');
  main.classList.add('main__waiting--room');

  const h1 = document.createElement('h2');
  h1.innerText = `01:00 para iniciar a partida`;

  idInterval2 = setInterval(() => {
    const time = new Date(room.createdAt).getTime() - new Date().getTime();
    let minutes = parseInt(time / (1000 * 60));
    minutes = minutes >= 0 ? minutes : 0 
    let seconds = parseInt((time % (1000 * 60)) / 1000);
    seconds = seconds >= 0 ? seconds : 0
    h1.innerText = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    } para iniciar a partida`;
  }, 1000);

  const title = document.createElement('p');
  title.innerText = 'Esperando outros jogadores...';

  const h2 = document.createElement('h2');
  h2.innerText = `Entraram (${room.players.length}/4)`;

  const divAllusers = document.createElement('div');
  divAllusers.classList.add('div__users');

  const player1 =
    room.players.length > 0
      ? room.players[0]
      : {
          username: 'Esperando jogador...',
          avatar: '',
        };

  const divUser1 = document.createElement('div');
  divUser1.classList.add('div_user');
  const imgUser1 = document.createElement('img');
  imgUser1.src = player1.avatar;
  const pUser1 = document.createElement('p');
  pUser1.innerText = player1.username;
  divUser1.append(imgUser1, pUser1);

  const player2 =
    room.players.length > 1
      ? room.players[1]
      : {
          username: 'Esperando jogador...',
          avatar: '',
        };

  const divUser2 = document.createElement('div');
  divUser2.classList.add('div_user');
  const imgUser2 = document.createElement('img');
  imgUser2.src = player2.avatar;
  const pUser2 = document.createElement('p');
  pUser2.innerText = player2.username;
  divUser2.append(imgUser2, pUser2);

  const player3 =
    room.players.length > 2
      ? room.players[2]
      : {
          username: 'Esperando jogador...',
          avatar: '',
        };

  const divUser3 = document.createElement('div');
  divUser3.classList.add('div_user');
  const imgUser3 = document.createElement('img');
  imgUser3.src = player3.avatar;
  const pUser3 = document.createElement('p');
  pUser3.innerText = player3.username;
  divUser3.append(imgUser3, pUser3);

  const player4 =
    room.players.length > 3
      ? room.players[3]
      : {
          username: 'Esperando jogador...',
          avatar: '',
        };

  const divUser4 = document.createElement('div');
  divUser4.classList.add('div_user');
  const imgUser4 = document.createElement('img');
  imgUser4.src = player4.avatar;
  const pUser4 = document.createElement('p');
  pUser4.innerText = player4.username;
  divUser4.append(imgUser4, pUser4);

  divAllusers.append(divUser1, divUser2, divUser3, divUser4);

  const cardRoom = document.createElement('img');
  cardRoom.classList.add('img__cards');
  cardRoom.src = './src/assets/img/cartas-room.png';

  main.append(h1, title, h2, divAllusers);
  page.append(main, cardRoom, divButtons, imgBackground);
};
export { renderWaitingRoomPage };
