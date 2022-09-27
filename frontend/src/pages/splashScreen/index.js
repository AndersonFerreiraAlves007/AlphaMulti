import { Modal } from '../../utils/modal.js';
import { navigate } from '../../utils/navigate.js';
import { SoundPlayer } from '../../utils/sound.js';

const renderSplashScreenPage = () => {
  const main = document.createElement('main');
  main.classList.add('splash');

  const btnTutorial = document.createElement('img');
  btnTutorial.classList.add('img__tutorial');
  btnTutorial.src = './src/assets/img/help.svg';

  btnTutorial.addEventListener('click', () => {
    SoundPlayer.click()
    Modal.showTutorialModal();
  });

  main.append(btnTutorial);

  const logo = document.createElement('img');
  logo.classList.add('logo__splash', 'animate__animated', 'animate__backInUp');
  logo.setAttribute('src', './src/assets/img/logo.png');

  const back = document.createElement('img');
  back.classList.add('back__splash');
  back.setAttribute('src', './src/assets/img/background.png');

  const btn = document.createElement('img');
  btn.classList.add('button__splash');
  btn.setAttribute('src', './src/assets/img/button-splash.svg');
  btn.addEventListener('click', () => {
    SoundPlayer.play()
    navigate('login');
  });

  main.append(logo);
  main.append(back);
  main.append(btn);

  document.getElementById('page').append(main);
};

export { renderSplashScreenPage };
