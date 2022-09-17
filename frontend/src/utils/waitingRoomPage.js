import { Globals } from './globals.js';

const renderWaitingRoomPage = () => {
  Globals.serverCommunication.enterRadomRoom();
  const page = document.getElementById('page');
  page.classList.add('waiting--room-page');

  const imgBackground = document.createElement('img');
  imgBackground.classList.add('background');
  imgBackground.src = './src/assets/img/background.png';

  const divButtons = document.createElement('div');
  divButtons.classList.add('buttons__configure');

  const btnSound = document.createElement('img');
  btnSound.classList.add('button__sound');
  btnSound.src = './src/assets/img/button-sound.png';

  const btnClose = document.createElement('img');
  btnClose.classList.add('button__close');
  btnClose.src = './src/assets/img/button-close.png';

  // const btnBack = document.createElement('img');
  // btnBack.classList.add('button__back');
  // btnBack.src = './src/assets/img/back-icon.svg';

  divButtons.append(btnSound, btnClose);

  const main = document.createElement('main');
  main.classList.add('main__waiting--room');

  const imgLogo = document.createElement('img');
  imgLogo.classList.add('room--logo');
  imgLogo.src = './src/assets/img/logo.png';

  const title = document.createElement('p');
  title.innerText = 'Esperando os outros jogadores entrarem na sala...';

  const h2 = document.createElement('h2');
  h2.innerText = 'Entraram (3/4)';

  const divAllusers = document.createElement('div');
  divAllusers.classList.add('div__users');

  const divUser1 = document.createElement('div');
  divUser1.classList.add('div_user');
  const imgUser1 = document.createElement('img');
  imgUser1.src = './src/assets/img/users/user2.svg';
  const pUser1 = document.createElement('p');
  pUser1.innerText = 'Usúario 1';
  divUser1.append(imgUser1, pUser1);

  const divUser2 = document.createElement('div');
  divUser2.classList.add('div_user');
  const imgUser2 = document.createElement('img');
  imgUser2.src = './src/assets/img/users/user9.svg';
  const pUser2 = document.createElement('p');
  pUser2.innerText = 'Usúario 2';
  divUser2.append(imgUser2, pUser2);

  const divUser3 = document.createElement('div');
  divUser3.classList.add('div_user');
  const imgUser3 = document.createElement('img');
  imgUser3.src = './src/assets/img/users/user6.svg';
  const pUser3 = document.createElement('p');
  pUser3.innerText = 'Usúario 3';
  divUser3.append(imgUser3, pUser3);

  const divUser4 = document.createElement('div');
  divUser4.classList.add('div_user');
  const imgUser4 = document.createElement('img');
  imgUser4.src = '';
  const pUser4 = document.createElement('p');
  pUser4.innerText = 'Esperando jogador...';
  divUser4.append(imgUser4, pUser4);

  divAllusers.append(divUser1, divUser2, divUser3, divUser4);

  const cardRoom = document.createElement('img');
  cardRoom.classList.add('img__cards');
  cardRoom.src = './src/assets/img/cartas-room.png';

  main.append(imgLogo, title, h2, divAllusers);
  page.append(main, cardRoom, divButtons, imgBackground);
};
export { renderWaitingRoomPage };
