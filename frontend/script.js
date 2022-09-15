/* import { ServerCommunication } from './src/services/ServerComunication.js';

let serverCommunication = null; */

function navigate(page) {
  switch (page) {
    case 'splashScreen':
      clearContent();
      renderSplashScreenPage();
      break;
    case 'login':
      clearContent();
      renderLoginPage();
      break;
    case 'room':
      clearContent();
      renderRoomPage();
      break;
    case 'game':
      clearContent();
      renderGamePage();
      break;
  }
}

function clearContent() {
  document.getElementById('page').innerHTML = '';
}

function renderSplashScreenPage() {
  const main = document.createElement('main');
  main.classList.add('splash');

  const logo = document.createElement('img');
  logo.classList.add('logo__splash');
  logo.setAttribute('src', './src/assets/img/logo.png');

  const back = document.createElement('img');
  back.classList.add('back__splash');
  back.setAttribute('src', './src/assets/img/background.png');

  const btn = document.createElement('img');
  btn.classList.add('button__splash');
  btn.setAttribute('src', './src/assets/img/button-splash.svg');
  btn.addEventListener('click', () => {
    navigate('login');
  });

  main.append(logo);
  main.append(back);
  main.append(btn);

  document.getElementById('page').append(main);
}

function renderLoginPage() {
  const main = document.createElement('main');
  main.classList.add('login');

  const backLogin = document.createElement('img');
  backLogin.classList.add('back__login');
  backLogin.setAttribute('src', './src/assets/img/background.png');

  const cardsLogin = document.createElement('img');
  cardsLogin.classList.add('cards__login');
  cardsLogin.setAttribute('src', './src/assets/img/cartas-login.png');

  const buttonsCofigure = document.createElement('div');
  buttonsCofigure.classList.add('buttons__configure');

  const buttonSound = document.createElement('input');
  buttonSound.classList.add('button__sound');
  buttonSound.setAttribute('type', 'image');
  buttonSound.setAttribute('src', './src/assets/img/button-sound.png');

  const buttosClose = document.createElement('input');
  buttosClose.classList.add('button__close');
  buttosClose.setAttribute('type', 'image');
  buttosClose.setAttribute('src', './src/assets/img/button-close.png');

  buttonsCofigure.append(buttonSound, buttosClose);

  const divLogoLogin = document.createElement('div');
  divLogoLogin.classList.add('div__logo__login');

  const logoLogin = document.createElement('img');
  logoLogin.classList.add('logo__login');
  logoLogin.setAttribute('src', './src/assets/img/logo.png');

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

  const buttonEsquerda = document.createElement('input');
  buttonEsquerda.classList.add('button__esquerda');
  buttonEsquerda.setAttribute('type', 'image');
  buttonEsquerda.setAttribute('src', './src/assets/img/button-esquerda.svg');

  const imgUsuario = document.createElement('img');
  imgUsuario.classList.add('img__usuario');
  imgUsuario.setAttribute('src', './src/assets/img/users/user1.svg');

  const buttonDireita = document.createElement('input');
  buttonDireita.classList.add('button__direita');
  buttonDireita.setAttribute('type', 'image');
  buttonDireita.setAttribute('src', './src/assets/img/button-direita.svg');

  const buttonPlay = document.createElement('input');
  buttonPlay.classList.add('button__play');
  buttonPlay.setAttribute('type', 'image');
  buttonPlay.setAttribute('src', './src/assets/img/button-play.svg');
  buttonPlay.addEventListener('click', () => {
    /* serverCommunication = new ServerCommunication('localhost:3333')
    serverCommunication.addEventListener('startGame', (data)=> {
      const { player, room } = data
      renderGamePage(player, room)
    })
  
    serverCommunication.addEventListener('endGame', (data)=> {
      const { player, room } = data
      renderGamePage(player, room)
    })
  
    serverCommunication.addEventListener('enterPlayer', (data)=> {
      const { player, room } = data
      renderGamePage(player, room)
    })
  
    serverCommunication.addEventListener('levePlayer', (data)=> {
      const { player, room } = data
      renderGamePage(player, room)
    })
  
    serverCommunication.addEventListener('makeMove', (data)=> {
      const { player, room } = data
      renderGamePage(player, room)
    }) */
    navigate('room');
  });

  containerUsuario.append(buttonEsquerda, imgUsuario, buttonDireita);

  containerLogin.append(inputLogin, containerUsuario, buttonPlay);
  
  containerPaiLogin.append(containerBlue, containerLogin);

  main.append(backLogin, cardsLogin, buttonsCofigure, divLogoLogin, containerPaiLogin);

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
}

function renderRoomPage() {
  const page = document.getElementById('page');


  const main = document.createElement('main');
  main.classList.add('room');

  const cardRoom = document.createElement('img');
  cardRoom.classList.add('cards__login');
  cardRoom.setAttribute('src', './src/assets/img/cartas-login.png');

  // const cardRoom = document.createElement('img');
  // cardRoom.classList.add('cartas__room');
  // cardRoom.src = './src/assets/img/cartas-room.png';

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
}

const player = {
  id: 1, 
  username: 'Anderson', 
  cards: [
    {
      color: 'b',
      value: '1'
    },
    {
      color: 'b',
      value: '2'
    },
    {
      color: 'b',
      value: '3'
    },
    {
      color: 'b',
      value: '4'
    },
    {
      color: 'b',
      value: '5'
    },
    {
      color: 'b',
      value: '6'
    },
    {
      color: 'b',
      value: '7'
    },
  ], 
  score: 1000, 
  order: 1, 
  isBot: false 
}

const room = {
  id: 1, 
  createdAt: new Date(), 
  startGameAt: new Date(), 
  startLastTurnAt: new Date(), 
  direction: 1, 
  isRun: true, 
  topCard: { 
    color: 'b', 
    value: '1', 
  },
  positionActive: 1, 
  players: [
    {
      id: 1, 
      username: 'Anderson', 
      numberCards: 7, 
      score: 1000, 
      order: 1, 
      isBot: false
    },
    {
      id: 2, 
      username: 'Adriana', 
      numberCards: 7, 
      score: 1000, 
      order: 2, 
      isBot: false
    },
    {
      id: 3, 
      username: 'Manu', 
      numberCards: 7, 
      score: 1000, 
      order: 3, 
      isBot: false
    },
    {
      id: 4, 
      username: 'Breda', 
      numberCards: 7, 
      score: 1000, 
      order: 4, 
      isBot: false
    }
  ]
}

function renderGamePage() {
  

  document.getElementById('page').innerHTML = `
  <main>
    <img class="background" src="./src/assets/img/background.png">
    <div class="buttons__configure">
        <input class="button__sound" type="image" src="./src/assets/img/button-sound.png"> 
        <input class="button__close" type="image" src="./src/assets/img/button-close.png">  
    </div>
        <div class="info__user--perfil">
            <img class="foto" src="./src/assets/img/users/user1.svg">
            <h2 class="">Kenji</h2>
            <h3 class="time__user">0:10</h3>
        </div>
        <div class="row alinhamento2 translate">
            <img class="card overflowA" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA2" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA3" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA4" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA5" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA6" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA7" src="./src/assets/img/verso-carta.png">
        </div>
    <div class="columnT alinhamento">
        <div class="teste">
            <div class="info__user--perfil">
                <img class="foto" src="./src/assets/img/users/user7.svg">
                <h2 class="">Ichigo</h2>
                <h3 class="time__user">0:10</h3>
            </div>
            <div class="column esquerda">
                <img class="card overflowY" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY2" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY3" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY4" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY5" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY6" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY7" src="./src/assets/img/verso-carta.png">
            </div>

        </div>
        <div class="carta-meio">
            <img class="carta-lixo" src="./src/assets/img/cards/red/3.svg">
        </div>
        <div class="teste">
            <div class="column direita">
                <img class="card overflowZ" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ2" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ3" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ4" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ5" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ6" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ7" src="./src/assets/img/verso-carta.png">
            </div>
            <div class="info__user--perfil">
                <img class="foto" src="./src/assets/img/users/user5.svg">
                <h2 class="">Naruto</h2>
                <h3 class="time__user">0:10</h3>
            </div>
        </div>
    </div>
    <div class="user__four">
        <div class="translate2">
            <img class="card overflowB" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB2" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB3" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB4" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB5" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB6" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB7" src="./src/assets/img/verso-carta.png">
        </div>
        <div class="info__user--perfil">
            <img class="foto" src="./src/assets/img/users/user10.svg">
            <h2 class="">Rukia</h2>
            <h3 class="time__user">0:10</h3>
        </div>
    </div>
    <h2 class="time__match">2:52</h2>
    <!-- <div id="card" class="card">
      
    </div> -->
  </main>
  `;
}

navigate('splashScreen');
