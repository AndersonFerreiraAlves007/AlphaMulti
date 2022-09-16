/* import { ServerCommunication } from './src/services/ServerComunication.js';

let serverCommunication = null; */

import { Modal } from './src/utils/modal.js';

function getImgCard(color, value) {
  if(value === 'm4') return './src/assets/img/cards/special/m4.svg'
  if(value === 's1') return './src/assets/img/cards/special/s1.svg'
  let folder = ''
  switch (color) {
    case 'b':
      folder = 'blue'
      break;
    case 'r':
      folder = 'red'
      break;
    case 'g':
      folder = 'green'
      break;
    case 'y':
      folder = 'yellow'
      break;
  }
  return `./src/assets/img/cards/${folder}/${value}.svg`
}

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
    case 'roomsPrivate':
      clearContent();
      renderRoomsPrivates();
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

  const cartasLogin = document.createElement('img');
  cartasLogin.classList.add('cartas__login');
  cartasLogin.setAttribute('src', './src/assets/img/cartas-login.png');

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

  main.append(backLogin, cartasLogin, buttonsCofigure, divLogoLogin, containerPaiLogin);

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

const rooms = [
  {
    id: '12',
    code: '123434',
    numberPlayers: 3,
    name: 'Sala 1'
  },
  {
    id: '12',
    code: '12345667',
    numberPlayers: 2,
    name: 'Sala 2'
  },
  {
    id: '12',
    code: '1234ggh',
    numberPlayers: 1,
    name: 'Sala 3'
  }
]

function renderRoomsPrivates() {
  var e_0 = document.createElement("main");
  e_0.setAttribute("class", "privateRooms");
  var e_1 = document.createElement("img");
  e_1.setAttribute("class", "backgroud");
  e_1.setAttribute("src", "./src/assets/img/background.png");
  e_0.appendChild(e_1);
  var e_2 = document.createElement("div");
  e_2.setAttribute("class", "inforRoom");
  var e_3 = document.createElement("h1");
  e_3.appendChild(document.createTextNode("Salas Privadas"));
  e_2.appendChild(e_3);
  var e_4 = document.createElement("div");
  e_4.setAttribute("class", "roomAll");

  rooms.forEach(item => {
    var e_5 = document.createElement("div");
    e_5.setAttribute("class", "roomCard");
    var e_6 = document.createElement("h3");
    e_6.appendChild(document.createTextNode(`${item.name} (${item.numberPlayers}/4)`));
    e_5.appendChild(e_6);
    var e_7 = document.createElement("h4");
    e_7.appendChild(document.createTextNode(`Código: ${item.code}`));
    e_5.appendChild(e_7);
    var e_8 = document.createElement("button");
    e_8.setAttribute("type", "button");
    e_8.appendChild(document.createTextNode("Entrar"));
    e_8.addEventListener('click', () => {
      Modal.showEnterRoomModal(`${item.name} (${item.numberPlayers}/4)`, (password) => {

      })
    })
    e_5.appendChild(e_8);
    e_4.appendChild(e_5);
  })
  

  e_2.appendChild(e_4);
  var e_17 = document.createElement("button");
  e_17.setAttribute("type", "button");
  e_17.appendChild(document.createTextNode("Criar sala"));
  e_17.addEventListener('click', () => {
    Modal.showCreateRoomModal((name, password)=> {

    })
  })
  e_2.appendChild(e_17);
  e_0.appendChild(e_2);
  const page = document.getElementById('page');
  page.append(e_0)
  
}

function renderRoomPage() {
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
}

const player = {
  id: 1,
  username: 'Anderson',
  cards: [
    {
      color: 'b',
      value: '1',
    },
    {
      color: 'r',
      value: '2',
    },
    {
      color: 'b',
      value: '3',
    },
    {
      color: 'g',
      value: '4',
    },
    {
      color: 's',
      value: 's1',
    },
    {
      color: 'y',
      value: '6',
    },
    {
      color: 's',
      value: 'm4',
    },
  ],
  score: 1000,
  order: 1,
  isBot: false,
  avatar: './src/assets/img/users/user1.svg'
};

const room = {
  id: 1,
  createdAt: new Date(),
  startGameAt: new Date(),
  startLastTurnAt: new Date(),
  direction: 1,
  isRun: true,
  type: 'public',
  name: 'Sala Legal',
  code: '',
  topCard: {
    color: 's',
    value: 'm4',
  },
  positionActive: 1,
  players: [
    {
      id: 1,
      username: 'Anderson',
      numberCards: 4,
      score: 1000,
      order: 1,
      isBot: false,
      avatar: './src/assets/img/users/user1.svg'
    },
    {
      id: 2,
      username: 'Adriana',
      numberCards: 7,
      score: 1000,
      order: 2,
      isBot: false,
      avatar: './src/assets/img/users/user2.svg'
    },
    {
      id: 3,
      username: 'Manu',
      numberCards: 7,
      score: 1000,
      order: 3,
      isBot: false,
      avatar: './src/assets/img/users/user3.svg'
    },
    {
      id: 4,
      username: 'Brenda',
      numberCards: 1,
      score: 1000,
      order: 4,
      isBot: false,
      avatar: './src/assets/img/users/user4.svg'
    },
  ],
};

function renderGamePage() {

  const orderPlayer = player.order

  const players = room.players.sort((a,b) => a.order - b.order)

  const playerIndex = players.findIndex(item => item.order === orderPlayer)

  let index = playerIndex

  /* const player4 = players[index] */
  const player4 = player
  index = index + 1
  index = index > 4 ? 1 : index

  const player2 = players[index]
  index = index + 1
  index = index > 4 ? 1 : index

  const player1 = players[index]
  index = index + 1
  index = index > 4 ? 1 : index

  const player3 = players[index]
  index = index + 1
  index = index > 4 ? 1 : index

  const page = document.getElementById('page');

  const main = document.createElement('main');
  page.append(main)

  const background = document.createElement('img');
  background.classList.add('background')
  background.setAttribute('src', './src/assets/img/background.png')
  main.append(background)

  const buttonsConfigure = document.createElement('div');
  buttonsConfigure.classList.add('buttons__configure')
  main.append(buttonsConfigure)

  const buttonSound = document.createElement('input');
  buttonSound.classList.add('button__sound')
  buttonSound.setAttribute('type', 'image')
  buttonSound.setAttribute('src', './src/assets/img/button-sound.png')
  buttonsConfigure.append(buttonSound)

  const buttonClose = document.createElement('input');
  buttonClose.classList.add('button__close')
  buttonClose.setAttribute('type', 'image')
  buttonClose.setAttribute('src', './src/assets/img/button-close.png')
  buttonsConfigure.append(buttonClose)

  const infoUserPerfil1 = document.createElement('div');
  infoUserPerfil1.classList.add('info__user--perfil')
  main.append(infoUserPerfil1)

  const infoUserPerfil1Foto = document.createElement('img');
  infoUserPerfil1Foto.classList.add('foto')
  infoUserPerfil1Foto.setAttribute('src', player1.avatar)
  infoUserPerfil1.append(infoUserPerfil1Foto)

  const infoUserPerfil1H2 = document.createElement('h2');
  infoUserPerfil1H2.innerText = player1.username
  infoUserPerfil1.append(infoUserPerfil1H2)

  if(player1.order === room.positionActive) {
    const infoUserPerfil1TimeUser = document.createElement('h3');
    infoUserPerfil1TimeUser.classList.add('time__user')
    infoUserPerfil1TimeUser.innerText = '0:10'
    infoUserPerfil1.append(infoUserPerfil1TimeUser)
  }

  const rowAlinhametoTranslate1 = document.createElement('div');
  rowAlinhametoTranslate1.classList.add('row', 'alinhamento2', 'translate')
  main.append(rowAlinhametoTranslate1)

  /* const cardsUser1Card1 = document.createElement('img');
  cardsUser1Card1.classList.add('card', 'overflowA')
  cardsUser1Card1.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card1)

  const cardsUser1Card2 = document.createElement('img');
  cardsUser1Card2.classList.add('card', 'overflowA2')
  cardsUser1Card2.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card2)

  const cardsUser1Card3 = document.createElement('img');
  cardsUser1Card3.classList.add('card', 'overflowA3')
  cardsUser1Card3.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card3)

  const cardsUser1Card4 = document.createElement('img');
  cardsUser1Card4.classList.add('card', 'overflowA4')
  cardsUser1Card4.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card4)

  const cardsUser1Card5 = document.createElement('img');
  cardsUser1Card5.classList.add('card', 'overflowA5')
  cardsUser1Card5.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card5)

  const cardsUser1Card6 = document.createElement('img');
  cardsUser1Card6.classList.add('card', 'overflowA6')
  cardsUser1Card6.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card6)

  const cardsUser1Card7 = document.createElement('img');
  cardsUser1Card7.classList.add('card', 'overflowA7')
  cardsUser1Card7.setAttribute('src', './src/assets/img/verso-carta.png')
  rowAlinhametoTranslate1.append(cardsUser1Card7) */

  for(let i = 1; i <= player1.numberCards; i++) {
    const cardsUser1Card1 = document.createElement('img');
    cardsUser1Card1.classList.add('card', `overflowA${i > 1 ? `${i}` : ''}`)
    cardsUser1Card1.setAttribute('src', './src/assets/img/verso-carta.png')
    rowAlinhametoTranslate1.append(cardsUser1Card1)
  }


  const colunaAlinhamento = document.createElement('div');
  colunaAlinhamento.classList.add('columnT', 'alinhamento')
  main.append(colunaAlinhamento)

  const testeUser1 = document.createElement('div');
  testeUser1.classList.add('teste')
  colunaAlinhamento.append(testeUser1)

  const infoUserPerfil2 = document.createElement('div');
  infoUserPerfil2.classList.add('info__user--perfil')
  testeUser1.append(infoUserPerfil2)

  const infoUserPerfil2Foto = document.createElement('img');
  infoUserPerfil2Foto.classList.add('foto')
  infoUserPerfil2Foto.setAttribute('src', player2.avatar)
  infoUserPerfil2.append(infoUserPerfil2Foto)

  const infoUserPerfil2H2 = document.createElement('h2');
  infoUserPerfil2H2.innerText = player2.username
  infoUserPerfil2.append(infoUserPerfil2H2)

  if(player2.order === room.positionActive) {
    const infoUserPerfil2TimeUser = document.createElement('h3');
    infoUserPerfil2TimeUser.classList.add('time__user')
    infoUserPerfil2TimeUser.innerText = '0:10'
    infoUserPerfil2.append(infoUserPerfil2TimeUser)
  }

  const colunaEsquerda = document.createElement('div');
  colunaEsquerda.classList.add('column', 'esquerda')
  testeUser1.append(colunaEsquerda)
  
  /* const cardsUser2Card1 = document.createElement('img');
  cardsUser2Card1.classList.add('card', 'overflowY')
  cardsUser2Card1.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card1)

  const cardsUser2Card2 = document.createElement('img');
  cardsUser2Card2.classList.add('card', 'overflowY2')
  cardsUser2Card2.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card2)

  const cardsUser2Card3 = document.createElement('img');
  cardsUser2Card3.classList.add('card', 'overflowY3')
  cardsUser2Card3.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card3)

  const cardsUser2Card4 = document.createElement('img');
  cardsUser2Card4.classList.add('card', 'overflowY4')
  cardsUser2Card4.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card4)

  const cardsUser2Card5 = document.createElement('img');
  cardsUser2Card5.classList.add('card', 'overflowY5')
  cardsUser2Card5.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card5)

  const cardsUser2Card6 = document.createElement('img');
  cardsUser2Card6.classList.add('card', 'overflowY6')
  cardsUser2Card6.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card6)

  const cardsUser2Card7 = document.createElement('img');
  cardsUser2Card7.classList.add('card', 'overflowY7')
  cardsUser2Card7.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaEsquerda.append(cardsUser2Card7) */

  for(let i = 1; i <= player2.numberCards; i++) {
    const cardsUser2Card1 = document.createElement('img');
    cardsUser2Card1.classList.add('card', `overflowY${i > 1 ? `${i}` : ''}`)
    cardsUser2Card1.setAttribute('src', './src/assets/img/verso-carta.png')
    colunaEsquerda.append(cardsUser2Card1)
  }

  const cartaMeio = document.createElement('div');
  cartaMeio.classList.add('carta-meio')
  colunaAlinhamento.append(cartaMeio)

  const cartaLixo = document.createElement('img');
  cartaLixo.classList.add('carta-lixo')
  cartaLixo.setAttribute('src', getImgCard(room.topCard.color, room.topCard.value))
  cartaMeio.append(cartaLixo)

  const testeUser2 = document.createElement('div');
  testeUser2.classList.add('teste')
  colunaAlinhamento.append(testeUser2)

  const colunaDireita = document.createElement('div');
  colunaDireita.classList.add('column', 'direita')
  testeUser2.append(colunaDireita)

  /* const cardsUser3Card1 = document.createElement('img');
  cardsUser3Card1.classList.add('card', 'overflowZ')
  cardsUser3Card1.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card1)

  const cardsUser3Card2 = document.createElement('img');
  cardsUser3Card2.classList.add('card', 'overflowZ2')
  cardsUser3Card2.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card2)

  const cardsUser3Card3 = document.createElement('img');
  cardsUser3Card3.classList.add('card', 'overflowZ3')
  cardsUser3Card3.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card3)

  const cardsUser3Card4 = document.createElement('img');
  cardsUser3Card4.classList.add('card', 'overflowZ4')
  cardsUser3Card4.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card4)

  const cardsUser3Card5 = document.createElement('img');
  cardsUser3Card5.classList.add('card', 'overflowZ5')
  cardsUser3Card5.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card5)

  const cardsUser3Card6 = document.createElement('img');
  cardsUser3Card6.classList.add('card', 'overflowZ6')
  cardsUser3Card6.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card6)

  const cardsUser3Card7 = document.createElement('img');
  cardsUser3Card7.classList.add('card', 'overflowZ7')
  cardsUser3Card7.setAttribute('src', './src/assets/img/verso-carta.png')
  colunaDireita.append(cardsUser3Card7) */

  for(let i = 1; i <= player3.numberCards; i++) {
    const cardsUser2Card1 = document.createElement('img');
    cardsUser2Card1.classList.add('card', `overflowZ${i > 1 ? `${i}` : ''}`)
    cardsUser2Card1.setAttribute('src', './src/assets/img/verso-carta.png')
    colunaDireita.append(cardsUser2Card1)
  }

  const infoUserPerfil3 = document.createElement('div');
  infoUserPerfil2.classList.add('info__user--perfil')
  testeUser2.append(infoUserPerfil3)

  const infoUserPerfil3Foto = document.createElement('img');
  infoUserPerfil3Foto.classList.add('foto')
  infoUserPerfil3Foto.setAttribute('src', player3.avatar)
  infoUserPerfil3.append(infoUserPerfil3Foto)

  const infoUserPerfil3H2 = document.createElement('h2');
  infoUserPerfil3H2.innerText = player3.username
  infoUserPerfil3.append(infoUserPerfil3H2)

  if(player3.order === room.positionActive) {
    const infoUserPerfil3TimeUser = document.createElement('h3');
    infoUserPerfil3TimeUser.classList.add('time__user')
    infoUserPerfil3TimeUser.innerText = '0:10'
    infoUserPerfil3.append(infoUserPerfil3TimeUser)
  }

  const userFour = document.createElement('div');
  userFour.classList.add('user__four')
  main.append(userFour)

  const traslate2 = document.createElement('div');
  traslate2.classList.add('translate2')
  userFour.append(traslate2)

  /* const cardsUser4Card1 = document.createElement('img');
  cardsUser4Card1.classList.add('card', 'overflowB')
  cardsUser4Card1.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card1)

  const cardsUser4Card2 = document.createElement('img');
  cardsUser4Card2.classList.add('card', 'overflowB2')
  cardsUser4Card2.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card2)

  const cardsUser4Card3 = document.createElement('img');
  cardsUser4Card3.classList.add('card', 'overflowB3')
  cardsUser4Card3.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card3)

  const cardsUser4Card4 = document.createElement('img');
  cardsUser4Card4.classList.add('card', 'overflowB4')
  cardsUser4Card4.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card4)

  const cardsUser4Card5 = document.createElement('img');
  cardsUser4Card5.classList.add('card', 'overflowB5')
  cardsUser4Card5.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card5)

  const cardsUser4Card6 = document.createElement('img');
  cardsUser4Card6.classList.add('card', 'overflowB6')
  cardsUser4Card6.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card6)

  const cardsUser4Card7 = document.createElement('img');
  cardsUser4Card7.classList.add('card', 'overflowB7')
  cardsUser4Card7.setAttribute('src', './src/assets/img/verso-carta.png')
  traslate2.append(cardsUser4Card7) */

  for(let i = 0; i < player4.cards.length; i++) {
    const cardsUser2Card1 = document.createElement('img');
    cardsUser2Card1.classList.add('card', `overflowB${i + 1 > 1 ? `${i + 1}` : ''}`, 'card-player')
    cardsUser2Card1.setAttribute('src', getImgCard(player4.cards[i].color, player4.cards[i].value))
    traslate2.append(cardsUser2Card1)
  }

  const infoUserPerfil4 = document.createElement('div');
  infoUserPerfil4.classList.add('info__user--perfil')
  userFour.append(infoUserPerfil4)

  const infoUserPerfil4Foto = document.createElement('img');
  infoUserPerfil4Foto.classList.add('foto')
  infoUserPerfil4Foto.setAttribute('src', player4.avatar)
  infoUserPerfil4.append(infoUserPerfil4Foto)

  const infoUserPerfil4H2 = document.createElement('h2');
  infoUserPerfil4H2.innerText = player4.username
  infoUserPerfil4.append(infoUserPerfil4H2)

  if(player4.order === room.positionActive) {
    const infoUserPerfil4TimeUser = document.createElement('h3');
    infoUserPerfil4TimeUser.classList.add('time__user')
    infoUserPerfil4TimeUser.innerText = '0:10'
    infoUserPerfil4.append(infoUserPerfil4TimeUser)
  }

  /* document.getElementById('page').innerHTML = `
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
   `; */
}

navigate('splashScreen');

/* renderRoomsPrivates() */

/* Modal.showEnterRoomModal('Sala 1 (3/4)'); */
