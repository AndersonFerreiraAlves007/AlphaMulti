import { navigate } from './navigate.js';

const renderLoginPage = () => {
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
};

export { renderLoginPage };
