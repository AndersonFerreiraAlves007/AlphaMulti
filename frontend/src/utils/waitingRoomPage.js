import { Globals } from './globals.js';

const renderWaitingRoomPage = () => {
  Globals.serverCommunication.enterRadomRoom();
  const page = document.getElementById('page');

  const main = document.createElement('main');
  main.classList.add('room');

  const cardRoom = document.createElement('img');
  cardRoom.classList.add('cartas__room');
  cardRoom.src = './src/assets/img/cartas-room.png';

  const divButtons = document.createElement('div');
  divButtons.classList.add('buttons__configure');

  const btnSound = document.createElement('input');
  btnSound.type = 'image';
  btnSound.classList.add('button__sound');
  btnSound.src = './src/assets/img/button-sound.png';

  const btnClose = document.createElement('input');
  btnClose.type = 'image';
  btnClose.classList.add('button__close');
  btnClose.src = './src/assets/img/button-close.png';

  divButtons.append(btnSound, btnClose);

  const imgBackground = document.createElement('img');
  imgBackground.classList.add('backgroud');
  imgBackground.src = './src/assets/img/background.png';

  const divLogo = document.createElement('div');
  divLogo.classList.add('logo');
  const imgLogo = document.createElement('img');
  imgLogo.src = './src/assets/img/logo.png';
  divLogo.append(imgLogo);

  const divInfo = document.createElement('div');
  divInfo.classList.add('infor');

  const h1 = document.createElement('h1');
  h1.innerText = 'Esperando os outros jogadores entrarem...';

  const h2 = document.createElement('h2');
  h2.innerText = 'Entraram (3/4)';

  const divAllusers = document.createElement('div');
  divAllusers.classList.add('userAll');

  const divUser1 = document.createElement('div');
  divUser1.classList.add('user');
  const imgUser1 = document.createElement('img');
  imgUser1.src = './src/assets/img/users/user2.svg';
  const pUser1 = document.createElement('p');
  pUser1.innerText = 'Usúario 1';
  divUser1.append(imgUser1, pUser1);

  const divUser2 = document.createElement('div');
  divUser2.classList.add('user');
  const imgUser2 = document.createElement('img');
  imgUser2.src = './src/assets/img/users/user9.svg';
  const pUser2 = document.createElement('p');
  pUser2.innerText = 'Usúario 2';
  divUser2.append(imgUser2, pUser2);

  const divUser3 = document.createElement('div');
  divUser3.classList.add('user');
  const imgUser3 = document.createElement('img');
  imgUser3.src = './src/assets/img/users/user6.svg';
  const pUser3 = document.createElement('p');
  pUser3.innerText = 'Usúario 3';
  divUser3.append(imgUser3, pUser3);

  const divUser4 = document.createElement('div');
  divUser4.classList.add('user');
  const imgUser4 = document.createElement('img');
  imgUser4.src = '';
  const pUser4 = document.createElement('p');
  pUser4.innerText = 'Esperando jogador...';
  divUser4.append(imgUser4, pUser4);

  divUser4.addEventListener('click', () => {
    navigate('game');
  });

  divAllusers.append(divUser1, divUser2, divUser3, divUser4);
  divInfo.append(h1, h2, divAllusers);
  main.append(cardRoom, divButtons, imgBackground, divLogo, divInfo);
  page.append(main);
  /*  document.getElementById('page').innerHTML = `
       <main>
           <img class="cartas__room" src="./src/assets/img/cartas-room.png">
           <div class="buttons__configure">
               <input class="button__sound" type="image" src="./src/assets/img/button-sound.png">
               <input class="button__close" type="image" src="./src/assets/img/button-close.png">
           </div>
           <img class="backgroud" src="./src/assets/img/background.png">
           <div class="logo">
               <img src="./src/assets/img/logo.png">
           </div>
           <div class="infor">
               <h1>Esperando os outros jogadores entrarem...</h1>
               <h2>Entraram (3/4)</h2>
               <div class="userAll">
                   <div class="user">
                       <img src="./src/assets/img/users/user2.svg">
                       <p>Usúario 1</p>
                   </div>
                   <div class="user">
                       <img src="./src/assets/img/users/user9.svg">
                       <p>Usúario 2</p>
                   </div>
                   <div class="user">
                       <img src="./src/assets/img/users/user6.svg">
                       <p>Usúario 3</p>
                   </div>
                   <div class="user">
                       <p>Esperando jogador...</p>
                   </div>
               </div>
           </div>
       </main>
     ` */
};

export { renderWaitingRoomPage };
