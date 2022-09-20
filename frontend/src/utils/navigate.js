import { renderGamePage } from './gamePage.js'
import { renderLoginPage } from './loginPage.js'
import { renderPrivateRooms } from './privateRooms.js'
import { renderRoomOptions } from './roomOptions.js'
import { renderSplashScreenPage } from './splashScreenPage.js'
import { renderWaitingRoomPage } from './waitingRoomPage.js'

function clearContent() {
  document.getElementById('page').innerHTML = '';
}

const navigate = (page) => {
  switch (page) {
    case 'splashScreen':
      clearContent();
      renderSplashScreenPage();
      break;
    case 'login':
      clearContent();
      renderLoginPage();
      break;
    case 'roomOptions':
      clearContent();
      renderRoomOptions();
      break;
    case 'game':
      clearContent();
      renderGamePage();
      break;
    case 'privateRooms':
      clearContent();
      renderPrivateRooms();
      break;
    case 'waitingRoom':
      clearContent();
      renderWaitingRoomPage();
      break;
  }
};

export { navigate };
