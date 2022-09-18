class Modal {
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
      callBack('yellow');
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

  static showVictoryModal = (avatarSrc = './src/assets/img/users/user1.svg', scoreValue = 100) => {
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
    avatar.src = avatarSrc;

    const divScore = document.createElement('div');
    divScore.classList.add('score');
    const titleScore = document.createElement('p');
    titleScore.innerText = 'Pontos';
    const score = document.createElement('p');
    score.innerText = scoreValue;
    divScore.append(titleScore, score);

    const btnExit = document.createElement('button');
    btnExit.innerText = 'Sair';
    btnExit.addEventListener('click', () => {
      this.closeVictoryModal();
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
    logo.src = './src/assets/img/logo.png';

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

  static closeVictoryModal() {
    const backgroundModal = document.querySelector('.background-modal');
    const modal = document.querySelector('.modal');
    modal.remove();
    backgroundModal.remove();
    //window.location.replace('../splashScreen/index.html');
  }
}

export { Modal };
