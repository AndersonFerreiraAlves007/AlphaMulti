const renderSplashScreenPage = () => {
  const main = document.createElement('main');
  main.classList.add('splash');

  const btnTutorial = document.createElement('img');
  btnTutorial.classList.add('img__tutorial');
  btnTutorial.src = '../../assets/img/help.svg';

  btnTutorial.addEventListener('click', () => {
    showTutorialModal();
  });

  main.append(btnTutorial);

  const logo = document.createElement('img');
  logo.classList.add('logo__splash');
  logo.setAttribute('src', '../../assets/img/logo.png');

  const back = document.createElement('img');
  back.classList.add('back__splash');
  back.setAttribute('src', '../../assets/img/background.png');

  const btn = document.createElement('img');
  btn.classList.add('button__splash');
  btn.setAttribute('src', '../../assets/img/button-splash.svg');
  btn.addEventListener('click', () => {
    navigate('login');
  });

  main.append(logo);
  main.append(back);
  main.append(btn);

  document.getElementById('page').append(main);
};

const showTutorialModal = () => {
  const body = document.querySelector('body');

  const backgroundModal = document.createElement('div');
  backgroundModal.classList.add('background-modal');

  backgroundModal.addEventListener('click', () => {
    closeTutorialModal();
  });

  const modal = document.createElement('div');
  modal.classList.add('modal-tutorial');

  const title = document.createElement('h1');
  title.classList.add('h1__tutorial');
  title.innerText = 'Regras do Jogo';

  modal.append(title);
  backgroundModal.append(modal);
  body.append(backgroundModal);
};

const closeTutorialModal = () => {
  const backgroundModal = document.querySelector('.background-modal');
  const modal = document.querySelector('.modal-tutorial');
  modal.remove();
  backgroundModal.remove();
};

renderSplashScreenPage();
