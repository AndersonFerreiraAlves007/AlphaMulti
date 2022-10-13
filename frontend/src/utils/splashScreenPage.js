import { Modal } from './modal.js';
import { navigate } from './navigate.js';

const renderSplashScreenPage = () => {
  const main = document.createElement('main');
  main.classList.add('splash');

  const btnTutorial = document.createElement('img');
  btnTutorial.classList.add('img__tutorial');
  btnTutorial.src = './src/assets/img/help.svg';

  btnTutorial.addEventListener('click', () => {
    Modal.showTutorialModal();
  });

  main.append(btnTutorial);

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
};

export { renderSplashScreenPage };