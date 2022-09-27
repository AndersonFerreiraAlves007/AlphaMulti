import { Globals } from './globals.js'

const audioEfeitos = document.getElementById('audio-efeitos');
const audioBackground = document.getElementById('audio-background');

audioEfeitos.volume = 0

class SoundPlayer {
  static pushCard() {
    audioEfeitos.setAttribute('src', 'src/assets/sounds/puxar_carta.mpeg')
    audioEfeitos.play();
  }

  static nextTurn() {
    audioEfeitos.setAttribute('src', 'src/assets/sounds/passar_a_vez.wav')
    audioEfeitos.play();
  }

  static click() {
    audioEfeitos.setAttribute('src', 'src/assets/sounds/click.mpeg')
    audioEfeitos.play();
  }

  static wind() {
    audioEfeitos.setAttribute('src', 'src/assets/sounds/vencedor.mpeg')
    audioEfeitos.play();
  }

  static play() {
    audioEfeitos.setAttribute('src', './src/assets/sounds/play.mpeg')
    audioEfeitos.play();
  }

  static toogleStatusAllAudios() {
    if(Globals.soundStatus) {
      Globals.soundStatus = false

      audioEfeitos.volume = 0

      audioBackground.volume = 0
      audioBackground.pause();
      audioBackground.loop = true;
    } else {
      Globals.soundStatus = true

      audioEfeitos.volume = 0.2

      audioBackground.volume = 0.1
      audioBackground.play();
      audioBackground.loop = true;
    }
  }

  static start
}

export { SoundPlayer }
