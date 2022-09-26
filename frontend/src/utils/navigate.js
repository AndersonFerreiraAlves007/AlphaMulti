import { renderGamePage } from './gamePage.js'
import { renderLoginPage } from './loginPage.js'
import { renderPrivateRooms } from './privateRooms.js'
import { renderPublicRooms } from './publicRooms.js'
import { renderRoomOptions } from './roomOptions.js'
import { renderSplashScreenPage } from './splashScreenPage.js'
import { renderWaitingRoomPage } from './waitingRoomPage.js'
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
