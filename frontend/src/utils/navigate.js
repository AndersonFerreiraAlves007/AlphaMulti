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
    case 'room':
      clearContent();
      renderRoomPage();
      break;
    case 'game':
      clearContent();
      renderGamePage();
      break;
    case 'roomsPrivate':
      clearContent();
      renderRoomsPrivates();
      break;
  }
};

export { navigate };
