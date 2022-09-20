const avatares = [
  './src/assets/img/users/user1.svg',
  './src/assets/img/users/user2.svg',
  './src/assets/img/users/user3.svg',
  './src/assets/img/users/user4.svg',
  './src/assets/img/users/user5.svg',
  './src/assets/img/users/user6.svg',
  './src/assets/img/users/user7.svg',
  './src/assets/img/users/user8.svg',
  './src/assets/img/users/user9.svg',
  './src/assets/img/users/user10.svg',
  './src/assets/img/users/user-robo-1.svg',
  './src/assets/img/users/user-robo-2.svg'
];

const renderLoginPage = () => {
  indexAvatar = 0;
  const main = document.createElement('main');
  main.classList.add('login');

  const backLogin = document.createElement('img');
  backLogin.classList.add('back__login');
  backLogin.setAttribute('src', './src/assets/img/background.png');

  const cartasLogin = document.createElement('img');
  cartasLogin.classList.add('cartas__login');
  cartasLogin.setAttribute('src', './src/assets/img/cartas-login.png');

  const buttonsCofigure = document.createElement('div');
  buttonsCofigure.classList.add('.buttons__configure--loginPage');

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

  const imgUsuario = document.createElement('img');
  imgUsuario.classList.add('img__usuario');
  imgUsuario.setAttribute('src', './src/assets/img/users/user1.svg');

  const buttonEsquerda = document.createElement('input');
  buttonEsquerda.classList.add('button__esquerda');
  buttonEsquerda.setAttribute('type', 'image');
  buttonEsquerda.setAttribute('src', './src/assets/img/button-esquerda.svg');
  buttonEsquerda.addEventListener('click', () => {
    
  });

  const buttonDireita = document.createElement('input');
  buttonDireita.classList.add('button__direita');
  buttonDireita.setAttribute('type', 'image');
  buttonDireita.setAttribute('src', './src/assets/img/button-direita.svg');
  buttonDireita.addEventListener('click', () => {
    
  });

  const buttonPlay = document.createElement('input');
  buttonPlay.classList.add('button__play');
  buttonPlay.setAttribute('type', 'image');
  buttonPlay.setAttribute('src', './src/assets/img/button-play.svg');
  buttonPlay.addEventListener('click', () => {
    
  });

  containerUsuario.append(buttonEsquerda, imgUsuario, buttonDireita);

  containerLogin.append(inputLogin, containerUsuario, buttonPlay);

  containerPaiLogin.append(containerBlue, containerLogin);

  main.append(backLogin, cartasLogin, buttonsCofigure, divLogoLogin, containerPaiLogin);

  document.getElementById('page').append(main);
};

export { renderLoginPage };
