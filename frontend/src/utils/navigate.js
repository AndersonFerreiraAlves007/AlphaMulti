import { renderGamePage } from '../pages/game/index.js'
import { renderLoginPage } from '../pages/login/index.js'
import { renderPrivateRooms } from '../pages/privateRooms/index.js'
import { renderPublicRooms } from '../pages/publicRooms/index.js'
import { renderRoomOptions } from '../pages/roomOptions/index.js'
import { renderSplashScreenPage } from '../pages/splashScreen/index.js'
import { renderWaitingRoomPage } from '../pages/waitingRoom/index.js'
import { Globals } from './globals.js'

function clearContent() {
  document.getElementById('page').innerHTML = '';
}

const navigate = (page) => {
  switch (page) {
    case 'splashScreen':
      Globals.screen = 'splashScreen'
      clearContent();
      renderSplashScreenPage();
      break;
    case 'login':
      Globals.screen = 'login'
      clearContent();
      renderLoginPage();
      break;
    case 'roomOptions':
      Globals.screen = 'roomOptions'
      clearContent();
      renderRoomOptions();
      break;
    case 'game':
      Globals.screen = 'game'
      clearContent();
      renderGamePage();
      break;
    case 'privateRooms':
      Globals.screen = 'privateRooms'
      clearContent();
      renderPrivateRooms();
      break;
    case 'publicRooms':
      Globals.screen = 'publicRooms'
      clearContent();
      renderPublicRooms();
      break;
    case 'waitingRoom':
      Globals.screen = 'waitingRoom'
      clearContent();
      renderWaitingRoomPage();
      break;
  }
};

export { navigate };
