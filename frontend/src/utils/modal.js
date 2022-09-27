import { Globals } from './globals.js';
import { SoundPlayer } from './sound.js'

class Modal {
  static showTutorialModal = () => {
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    backgroundModal.addEventListener('click', () => {
      SoundPlayer.click()
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
    title.innerText = 'Escolha uma cor para seguir:';

    const divColors = document.createElement('div');
    divColors.classList.add('div__colors');
    const divRed = document.createElement('div');
    divRed.classList.add('color', 'red');
    divRed.addEventListener('click', () => {
      SoundPlayer.click()
      callBack('r');
      this.closeColorModal();
    });

    const divYellow = document.createElement('div');
    divYellow.classList.add('color', 'yellow');
    divYellow.addEventListener('click', () => {
      SoundPlayer.click()
      callBack('y');
      this.closeColorModal();
    });

    const divGreen = document.createElement('div');
    divGreen.classList.add('color', 'green');
    divGreen.addEventListener('click', () => {
      SoundPlayer.click()
      callBack('g');
      this.closeColorModal();
    });

    const divBlue = document.createElement('div');
    divBlue.classList.add('color', 'blue');
    divBlue.addEventListener('click', () => {
      SoundPlayer.click()
      callBack('b');
      this.closeColorModal();
    });

    divColors.append(divRed, divYellow, divGreen, divBlue);

    modal.append(title, divColors);
    backgroundModal.append(modal);
    body.append(backgroundModal);
  }

  static showVictoryModal = (playerWiner, callBack = () => {}) => {
    SoundPlayer.wind()
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    const modal = document.createElement('section');
    modal.classList.add('modal');

    const title = document.createElement('img');
    title.classList.add('title');
    title.src = './src/assets/img/winner.png';

    const avatar = document.createElement('img');
    avatar.classList.add('avatar');
    avatar.src = playerWiner.avatar || './src/assets/img/users/user1.svg';

    const username = document.createElement('p');
    username.innerText = playerWiner.username || 'Adriaa';

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
      SoundPlayer.click()
      this.closeVictoryModal();
      callBack();
    });

    modal.append(/* logo,  */ title, avatar, username, divScore, btnExit);
    backgroundModal.append(modal);
    body.append(backgroundModal);
  };

  static showCreateRoomModal = (callback) => {
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    const title = document.createElement('h1');
    title.classList.add('h1__criar');
    title.innerText = 'Criar sala';

    const modal = document.createElement('section');
    modal.classList.add('modal--create-room');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Nome da sala');
    const passwordInput = document.createElement('input');
    passwordInput.setAttribute('placeholder', 'Senha da sala');
    passwordInput.type = 'password';

    const divButtons = document.createElement('div');

    const btnCreate = document.createElement('button');
    btnCreate.innerText = 'Criar Sala';
    btnCreate.addEventListener('click', () => {
      SoundPlayer.click()
      if(true) {
        callback(nameInput.value, passwordInput.value);
        this.closeCreateRoomModal();
      } else {
        
      }
    });

    const btnExit = document.createElement('button');
    btnExit.innerText = 'Sair';
    btnExit.addEventListener('click', () => {
      SoundPlayer.click()
      this.closeCreateRoomModal();
    });
    divButtons.append(btnCreate, btnExit);

    modal.append(title);
    modal.append(nameInput, passwordInput, divButtons);
    backgroundModal.append(modal);
    body.append(backgroundModal);
  };

  static showCreateRoomPublicModal = (callback) => {
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    const title = document.createElement('h1');
    title.classList.add('h1__criar');
    title.innerText = 'Criar sala';

    const modal = document.createElement('section');
    modal.classList.add('modal--create-room');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('placeholder', 'Nome da sala');

    const divButtons = document.createElement('div');

    const btnCreate = document.createElement('button');
    btnCreate.innerText = 'Criar Sala';
    btnCreate.addEventListener('click', () => {
      SoundPlayer.click()
      if(true) {
        callback(nameInput.value);
        this.closeCreateRoomModal();
      } else {

      }
    });

    const btnExit = document.createElement('button');
    btnExit.innerText = 'Sair';
    btnExit.addEventListener('click', () => {
      SoundPlayer.click()
      this.closeCreateRoomModal();
    });
    divButtons.append(btnCreate, btnExit);

    modal.append(title);
    modal.append(nameInput, divButtons);
    backgroundModal.append(modal);
    body.append(backgroundModal);
  };

  static showEnterRoomModal = (name, callback) => {
    const body = document.querySelector('body');

    const backgroundModal = document.createElement('div');
    backgroundModal.classList.add('background-modal');

    const modal = document.createElement('section');
    modal.classList.add('modal--create-room');

    const title = document.createElement('h1');
    title.classList.add('h1__criar');
    title.innerText = 'Entrar na sala';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.setAttribute('placeholder', 'Senha da sala');

    const divButtons = document.createElement('div');

    const btnEnter = document.createElement('button');
    btnEnter.innerText = 'Entrar';
    btnEnter.addEventListener('click', () => {
      SoundPlayer.click()
      callback(passwordInput.value);
      this.closeCreateRoomModal();
    });

    const btnExit = document.createElement('button');
    btnExit.innerText = 'Sair';
    btnExit.addEventListener('click', () => {
      SoundPlayer.click()
      this.closeCreateRoomModal();
    });

    divButtons.append(btnEnter, btnExit);

    modal.append(title, passwordInput, divButtons);
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
  }

  static closeCreateRoomModal() {
    const backgroundModal = document.querySelector('.background-modal');
    const modal = document.querySelector('.modal--create-room');
    modal.remove();
    backgroundModal.remove();
  }
}

export { Modal };
