class Room {
  static renderRoom = () => {
    const body = document.querySelector('body');
    const main = document.createElement('main');

    const imgBackground = document.createElement('img');
    imgBackground.classList.add('background');
    imgBackground.src = '../../assets/img/background.png';

    const divButtons = document.createElement('div');
    divButtons.classList.add('buttons__configure');
    const btnSound = document.createElement('img');
    btnSound.classList.add('button__sound');
    btnSound.src = '../../assets/img/button-sound.png';
    const btnClose = document.createElement('img');
    btnClose.classList.add('button__close');
    btnClose.src = '../../assets/img/button-close.png';
    divButtons.append(btnSound, btnClose);

    const imgCards = document.createElement('img');
    imgCards.classList.add('img__cards');
    imgCards.src = '../../assets/img/cartas-room.png';

    const imglogo = document.createElement('img');
    imglogo.classList.add('logo');
    imglogo.src = '../../assets/img/logo.png';

    const title = document.createElement('p');
    title.innerText = 'Escolha uma opção';

    const divRooms = document.createElement('div');
    divRooms.classList.add('rooms');
    const divRoom1 = document.createElement('div');
    const room1Title = document.createElement('p');
    room1Title.innerText = 'Salas Aleatórias';
    const room1Img = document.createElement('img');
    room1Img.src = '../../assets/img/public-room.svg';
    divRoom1.append(room1Title, room1Img);

    const divRoom2 = document.createElement('div');
    const room2Title = document.createElement('p');
    room2Title.innerText = 'Salas Privadas';
    const room2Img = document.createElement('img');
    room2Img.src = '../../assets/img/private-room.svg';
    divRoom2.append(room2Title, room2Img);

    divRooms.append(divRoom1, divRoom2);

    main.append(imglogo, title, divRooms);
    body.append(imgBackground, divButtons, main, imgCards);
  };
}

//Room.renderRoom();

export { Room };
