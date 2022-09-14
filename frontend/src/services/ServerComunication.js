class ServerCommunication {
  constructor(host, isSsl = false) {
    this.url = `${isSsl ? 'https://' : 'http://'}${host}`
    this.ws = new WebSocket(`${isSsl ? 'ws://' : 'wss://'}${host}`);

    this.ws.onopen = function (event) {
      console.log('Conectou o socket!')
    };

    this.ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data)
      switch (msg.type) {
        case 'init':
          const username = sessionStorage.getItem('username')
          sessionStorage.setItem('playerId', msg.playerId)
          this.ws.send(JSON.stringify({
            type: 'login',
            payload: {
              username,
              id: sessionStorage.getItem('playerId')
            }
          }))
          break;
        case 'startGame': {
          sessionStorage.setItem('roomId', msg.payload.roomId)
          const dataPlayer = await this.getDataPlayer()
          const dataRoom = await this.getDataRoom()
          this.events.startGame.forEach(callback => callback({
            player: dataPlayer,
            room: dataRoom
          }))
          break
        }
        case 'endGame': {
          const dataPlayer = await this.getDataPlayer()
          const dataRoom = await this.getDataRoom()
          this.events.endGame.forEach(callback => callback({
            player: dataPlayer,
            room: dataRoom
          }))
          break
        }
        case 'enterPlayer': {
          const dataPlayer = await this.getDataPlayer()
          const dataRoom = await this.getDataRoom()
          this.events.enterPlayer.forEach(callback => callback({
            player: dataPlayer,
            room: dataRoom
          }))
          break
        }
        case 'levePlayer': {
          const dataPlayer = await this.getDataPlayer()
          const dataRoom = await this.getDataRoom()
          this.events.levePlayer.forEach(callback => callback({
            player: dataPlayer,
            room: dataRoom
          }))
          break
        }
          break
        case 'makeMove': {
          const dataPlayer = await this.getDataPlayer()
          const dataRoom = await this.getDataRoom()
          this.events.makeMove.forEach(callback => callback({
            player: dataPlayer,
            room: dataRoom
          }))
          break
        }
      }
    }

    this.events = {
      startGame: [],
      endGame: [],
      enterPlayer: [],
      levePlayer: [],
      makeMove: [],
    }
  }

  // métodos que podem ser usados

  async getDataPlayer() {
    const response = await fetch(`${url}/get-data-player/${sessionStorage.getItem('playerId')}`)
    const data = await response.json()
    return data
  }

  async getDataRoom() {
    const response = await fetch(`${url}/get-data-room/${sessionStorage.getItem('roomId')}`)
    const data = await response.json()
    return data
  }

  logout() {
    this.ws.send(JSON.stringify({
      type: 'logout',
      payload: {
        playerId: sessionStorage.getItem('playerId')
      }
    }))
    sessionStorage.removeItem('roomId')
    sessionStorage.removeItem('playerId')
    this.ws.close()
  }

  leaveRoom() {
    this.ws.send(JSON.stringify({
      type: 'leaveRoom',
      payload: {
        playerId: sessionStorage.getItem('playerId')
      }
    }))
    sessionStorage.removeItem('roomId')
  }

  enterRadomRoom() {
    this.ws.send(JSON.stringify({
      type: 'enterRandomRoom',
      payload: {
        playerId: sessionStorage.getItem('playerId')
      }
    }))
  }

  playTurn(color, value) {
    this.ws.send(JSON.stringify({
      type: 'playTurn',
      payload: {
        playerId: sessionStorage.getItem('playerId'),
        color,
        value
      }
    }))
  }

  addEventListener(event, calback) {
    switch (event) {
      case 'startGame':
        this.events.startGame.push(calback)
        break;
      case 'endGame':
        this.events.endGame.push(calback)
        break;
      case 'enterPlayer':
        this.events.enterPlayer.push(calback)
        break;
      case 'levePlayer':
        this.events.levePlayer.push(calback)
        break;
      case 'makeMove':
        this.events.makeMove.push(calback)
        break;
      default:
        throw 'Este evento é inexistente!'
    }
  }
}

export {
  ServerCommunication
}

/* const serverCommunication = new ServerCommunication() */

/* serverCommunication.addEventListener('endGame', (data) {
  const { player, room } = data

  //algum código
}) */

/* export default serverCommunication */
