class Modal {
  static showTutorialModal = () => {
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    backgroundModal.addEventListener('click', () => {
      this.closeTutorialModal();
    });

    const modal = document.createElement('div');
    modal.classList.add('modal-tutorial');

    const title = document.createElement('h1');
    title.classList.add('h1__tutorial');
    title.innerText = 'Regras do Jogo';

    const contentOl = document.createElement('ol');

    const content1 = document.createElement('li');
    title.classList.add('p__tutorial');
    content1.innerText = 'Quem começa o jogo é o criador da sala';

    const content2 = document.createElement('li');
    title.classList.add('p__tutorial');
    content2.innerText =
      'Caso o jogador tenha que comprar uma carta ou recebe o coringa +2 ou +4, comprará a carta e passará para o próximo jogador';

    const content3 = document.createElement('li');
    title.classList.add('p__tutorial');
    content3.innerText =
      'Cada jogador deverá jogar em 0:15 caso não jogue, deverá comprar uma carta';

    const content4 = document.createElement('li');
    title.classList.add('p__tutorial');
    content4.innerText =
      'Caso o jogador não possua a carta com a mesma cor, número ou coringa, deverá comprar uma no deck';

    const content5 = document.createElement('li');
    title.classList.add('p__tutorial');
    content5.innerText = 'Ganha o jogador que não tiver nenhuma carta na mão';

    modal.append(title);
    modal.append(contentOl);
    contentOl.append(content1);
    contentOl.append(content2);
    contentOl.append(content3);
    contentOl.append(content4);
    contentOl.append(content5);

    backgroundModal.append(modal);
    body.append(backgroundModal);
  };

  static showChooseColorModal(callBack = () => {}) {
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    const modal = document.createElement('div');
    modal.classList.add('modal-color');

    const title = document.createElement('p');
    title.innerText = 'Escolha um cor para seguir:';

    const divColors = document.createElement('div');
    divColors.classList.add('div__colors');
    const divRed = document.createElement('div');
    divRed.classList.add('color', 'red');
    divRed.addEventListener('click', () => {
      callBack('r');
      this.closeColorModal();
    });

    const divYellow = document.createElement('div');
    divYellow.classList.add('color', 'yellow');
    divYellow.addEventListener('click', () => {
      callBack('y');
      this.closeColorModal();
    });

    const divGreen = document.createElement('div');
    divGreen.classList.add('color', 'green');
    divGreen.addEventListener('click', () => {
      callBack('g');
      this.closeColorModal();
    });

    const divBlue = document.createElement('div');
    divBlue.classList.add('color', 'blue');
    divBlue.addEventListener('click', () => {
      callBack('b');
      this.closeColorModal();
    });

    divColors.append(divRed, divYellow, divGreen, divBlue);

    modal.append(title, divColors);
    backgroundModal.append(modal);
    body.append(backgroundModal);
  }

  static showVictoryModal = (playerWiner, callBack = () => {}) => {
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    const modal = document.createElement('section');
    modal.classList.add('modal');

    const logo = document.createElement('img');
    logo.classList.add('logo');
    logo.src = './src/assets/img/logo.png';

    const title = document.createElement('img');
    title.classList.add('title');
    title.src = './src/assets/img/winner.png';

    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = playerWiner.avatar || './src/assets/img/users/user1.svg';

    const divScore = document.createElement('div');
    divScore.classList.add('score');
    const titleScore = document.createElement('p');
    titleScore.innerText = 'Pontos';
    const score = document.createElement('p');
    score.innerText = playerWiner.score || 100;
    divScore.append(titleScore, score);

    const btnExit = document.createElement('button');
    btnExit.innerText = 'Sair';
    btnExit.addEventListener('click', () => {
      this.closeVictoryModal();
      callBack();
    });

    modal.append(logo, title, avatar, divScore, btnExit);
    backgroundModal.append(modal);
    body.append(backgroundModal);
  };

  static showCreateRoomModal = (callback) => {
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    const modal = document.createElement('section');
    modal.classList.add('modal');

    const logo = document.createElement('img');
    logo.classList.add('logo');
    // logo.src = './src/assets/img/logo.png';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Nome da sala');
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('placeholder', 'Senha da sala');

    const btnCreate = document.createElement('button');
    btnCreate.innerText = 'Criar Sala';
    btnCreate.addEventListener('click', () => {
      callback(nameInput.value, passwordInput.value);
      this.closeVictoryModal();
    });

    const btnExit = document.createElement('button');
    btnExit.innerText = 'Sair';
    btnExit.addEventListener('click', () => {
      this.closeVictoryModal();
    });

    modal.append(nameInput, passwordInput, btnCreate, btnExit);
    backgroundModal.append(modal);
    body.append(backgroundModal);
  };

  static showEnterRoomModal = (name, callback) => {
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    const modal = document.createElement('section');
    modal.classList.add('modal');

    const logo = document.createElement('img');
    logo.classList.add('logo');
    logo.src = './src/assets/img/logo.png';

    const title = document.createElement('h2');
    title.innerText = name;

    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('placeholder', 'Senha da sala');

    const btnCreate = document.createElement('button');
    btnCreate.innerText = 'Entrar';
    btnCreate.addEventListener('click', () => {
      callback(passwordInput.value);
      this.closeVictoryModal();
    });

    const btnExit = document.createElement('button');
    btnExit.innerText = 'Sair';
    btnExit.addEventListener('click', () => {
      this.closeVictoryModal();
    });

    modal.append(title, passwordInput, btnCreate, btnExit);
    backgroundModal.append(modal);
    body.append(backgroundModal);
  };

  static closeColorModal() {
    const backgroundModal = document.querySelector('.background-modal');
    const modal = document.querySelector('.modal-color');
    modal.remove();
    backgroundModal.remove();
  }

  static closeTutorialModal = () => {
    const backgroundModal = document.querySelector('.background-modal');
    const modal = document.querySelector('.modal-tutorial');
    modal.remove();
    backgroundModal.remove();
  };

  static closeVictoryModal() {
    const backgroundModal = document.querySelector('.background-modal');
    const modal = document.querySelector('.modal');
    modal.remove();
    backgroundModal.remove();
    //window.location.replace('../splashScreen/index.html');
  }
}

export { Modal };
