import { ServerCommunication } from './src/services/ServerComunication.js'

let serverCommunication = null

function navigate(page) {
  switch (page) {
    case 'splashScreen':
      clearContent()
      renderSplashScreenPage()
      break;
    case 'login':
      clearContent()
      renderLoginPage()
      break;
    case 'room':
      clearContent()
      renderRoomPage()
    break;
    case 'game':
      clearContent()
      renderGamePage()
    break;
  }
}

function clearContent() {
  document.getElementById('page').innerHTML = ''
}

function renderSplashScreenPage() {
  const main = document.createElement('main')

  const logo = document.createElement('img')
  logo.classList.add('logo__splash')
  logo.setAttribute('src', './src/assets/img/logo.png')

  const back = document.createElement('img')
  back.classList.add('back__splash')
  back.setAttribute('src', './src/assets/img/background.png')

  const btn = document.createElement('img')
  btn.classList.add('button__splash')
  btn.setAttribute('src', './src/assets/img/button-splash.svg')
  btn.addEventListener('click', () => {
    navigate('login')
  })

  main.append(logo)
  main.append(back)
  main.append(btn)

  document.getElementById('page').append(main)

}

function renderLoginPage() {

  document.getElementById('page').innerHTML = `
  <main>
    <img class="back__login" src="./src/assets/img/background.png">
      <img class="cartas__login" src="./src/assets/img/cartas-login.png">
      <div class="buttons__configure">
        <input class="button__sound" type="image" src="./src/assets/img/button-sound.png"> 
        <input class="button__close" type="image" src="./src/assets/img/button-close.png">  
      </div>
    <div class="div__logo__login">
      <img class="logo__login" src="./src/assets/img/logo.png">
    </div>
    <div class="container__pai__login">
      <img class="container__blue" src="./src/assets/img/back-login.png">

      <div class="container__login">
        <input type="text" class="input__login" placeholder="Insira seu nome">
        <div class="container__usuario">
          <input class="button__esquerda" type="image" src="./src/assets/img/button-esquerda.svg"> 
          <img class="img__usuario" src="./src/assets/img/users/user1.svg"> 
          <input class="button__direita" type="image" src="./src/assets/img/button-direita.svg">  
          </div>
          <input class="button__play" type="image" src="./src/assets/img/button-play.svg">  
      
        </div>  
  </div>
  </main>  

  `
}

function renderRoomPage() {
  document.getElementById('page').innerHTML = `
    <main>
        <img class="cartas__room" src="./src/assets/img/cartas-room.png">
        <div class="buttons__configure">
            <input class="button__sound" type="image" src="./src/assets/img/button-sound.png">
            <input class="button__close" type="image" src="./src/assets/img/button-close.png">
        </div>
        <img class="backgroud" src="./src/assets/img/background.png">
        <div class="logo">
            <img src="./src/assets/img/logo.png">
        </div>
        <div class="infor">
            <h1>Esperando os outros jogadores entrarem...</h1>
            <h2>Entraram (3/4)</h2>
            <div class="userAll">
                <div class="user">
                    <img src="./src/assets/img/users/user2.svg">
                    <p>Usúario 1</p>
                </div>
                <div class="user">
                    <img src="./src/assets/img/users/user9.svg">
                    <p>Usúario 2</p>
                </div>
                <div class="user">
                    <img src="./src/assets/img/users/user6.svg">
                    <p>Usúario 3</p>
                </div>
                <div class="user">
                    <p>Esperando jogador...</p>
                </div>
            </div>

        </div>
    </main>
  `
}

function renderGamePage() {
  document.getElementById('page').innerHTML = `
  <main>
    <img class="background" src="./src/assets/img/background.png">
    <div class="buttons__configure">
        <input class="button__sound" type="image" src="./src/assets/img/button-sound.png"> 
        <input class="button__close" type="image" src="./src/assets/img/button-close.png">  
    </div>
        <div class="info__user--perfil">
            <img class="foto" src="./src/assets/img/users/user1.svg">
            <h2 class="">Kenji</h2>
            <h3 class="time__user">0:10</h3>
        </div>
        <div class="row alinhamento2 translate">
            <img class="card overflowA" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA2" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA3" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA4" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA5" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA6" src="./src/assets/img/verso-carta.png">
            <img class="card overflowA7" src="./src/assets/img/verso-carta.png">
        </div>
    <div class="columnT alinhamento">
        <div class="teste">
            <div class="info__user--perfil">
                <img class="foto" src="./src/assets/img/users/user7.svg">
                <h2 class="">Ichigo</h2>
                <h3 class="time__user">0:10</h3>
            </div>
            <div class="column esquerda">
                <img class="card overflowY" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY2" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY3" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY4" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY5" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY6" src="./src/assets/img/verso-carta.png">
                <img class="card overflowY7" src="./src/assets/img/verso-carta.png">
            </div>

        </div>
        <div class="carta-meio">
            <img class="carta-lixo" src="./src/assets/img/cards/red/3.svg">
        </div>
        <div class="teste">
            <div class="column direita">
                <img class="card overflowZ" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ2" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ3" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ4" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ5" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ6" src="./src/assets/img/verso-carta.png">
                <img class="card overflowZ7" src="./src/assets/img/verso-carta.png">
            </div>
            <div class="info__user--perfil">
                <img class="foto" src="./src/assets/img/users/user5.svg">
                <h2 class="">Naruto</h2>
                <h3 class="time__user">0:10</h3>
            </div>
        </div>
    </div>
    <div class="user__four">
        <div class="translate2">
            <img class="card overflowB" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB2" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB3" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB4" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB5" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB6" src="./src/assets/img/verso-carta.png">
            <img class="card overflowB7" src="./src/assets/img/verso-carta.png">
        </div>
        <div class="info__user--perfil">
            <img class="foto" src="./src/assets/img/users/user10.svg">
            <h2 class="">Rukia</h2>
            <h3 class="time__user">0:10</h3>
        </div>
    </div>
    <h2 class="time__match">2:52</h2>
    <!-- <div id="card" class="card">
      
    </div> -->
  </main>
  `
}

navigate('splashScreen')
