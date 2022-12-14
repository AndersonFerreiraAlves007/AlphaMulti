class ServerCommunication {
  constructor(host, isSsl = false) {
    this.url = `${isSsl ? 'https://' : 'http://'}${host}`
    this.ws = new WebSocket(`${isSsl ? 'wss://' : 'ws://'}${host}`);

    this.ws.onopen = function (event) {
      console.log('Conectou o socket!')
    };

    this.ws.onmessage = async (event) => {
      const msg = JSON.parse(event.data)
      switch (msg.type) {
        case 'init':
          const username = sessionStorage.getItem('username')
          const avatar = sessionStorage.getItem('avatar')
          sessionStorage.setItem('playerId', msg.playerId)
          this.ws.send(JSON.stringify({
            type: 'login',
            payload: {
              username,
              playerId: sessionStorage.getItem('playerId'),
              avatar
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
          this.events.endGame.forEach(callback => callback({
            winer: msg.payload.winer,
            score: msg.payload.score
          }))
          break
        }
        case 'enterPlayer': {
          sessionStorage.setItem('roomId', msg.payload.roomId)
          const dataPlayer = await this.getDataPlayer()
          const dataRoom = await this.getDataRoom()
          this.events.enterPlayer.forEach(callback => callback({
            player: dataPlayer,
            room: dataRoom
          }))
          break
        }
        case 'levePlayer': {
          if(msg.payload.playerId === sessionStorage.getItem('playerId')) {
            sessionStorage.removeItem('roomId')
            this.events.levePlayer.forEach(callback => callback({
              isPlayerLogged: true,
              isLogout: msg.payload.isLogout
            }))
          } else {
            const dataPlayer = await this.getDataPlayer()
            const dataRoom = await this.getDataRoom()
            this.events.levePlayer.forEach(callback => callback({
              isPlayerLogged: false,
              isLogout: msg.payload.isLogout,
              player: dataPlayer,
              room: dataRoom
            }))
          }
          break
        }
        case 'makeMove': {
          const dataPlayer = await this.getDataPlayer()
          const dataRoom = await this.getDataRoom()
          this.events.makeMove.forEach(callback => callback({
            player: dataPlayer,
            room: dataRoom
          }))
          break
        }
        case 'changeRoomsAvaliables': {
          this.events.changeRoomsAvaliables.forEach(callback => callback())
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
      changeRoomsAvaliables: [],
    }
  }

  async getDataPlayer() {
    const response = await fetch(`${this.url}/get-data-player/${sessionStorage.getItem('playerId')}`)
    const data = await response.json()
    return data
  }

  async getDataRoom() {
    const response = await fetch(`${this.url}/get-data-room/${sessionStorage.getItem('roomId')}`)
    const data = await response.json()
    return data
  }

  async getRoomsPrivate() {
    const response = await fetch(`${this.url}/get-rooms-privates`)
    const data = await response.json()
    return data
  }

  async getRoomsPublic() {
    const response = await fetch(`${this.url}/get-rooms-publics`)
    const data = await response.json()
    return data
  }

  async createRoomPrivate(name, password) {
    const response = await fetch(`${this.url}/create-room-private`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        playerId: sessionStorage.getItem('playerId'),
        name,
        password
      })
    })
    const data = await response.json()
    return data
  }

  async createRoomPublic(name) {
    const response = await fetch(`${this.url}/create-room-public`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        playerId: sessionStorage.getItem('playerId'),
        name
      })
    })
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
    //sessionStorage.removeItem('roomId')
  }

  enterPrivateRoom(roomId, password) {
    this.ws.send(JSON.stringify({
      type: 'enterPrivateRoom',
      payload: {
        playerId: sessionStorage.getItem('playerId'),
        roomId,
        password
      }
    }))
  }

  enterPublicRoom(roomId) {
    this.ws.send(JSON.stringify({
      type: 'enterPublicRoom',
      payload: {
        playerId: sessionStorage.getItem('playerId'),
        roomId,
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
      case 'changeRoomsAvaliables':
        this.events.changeRoomsAvaliables.push(calback)
        break;
      default:
        throw 'Este evento ?? inexistente!'
    }
  }
}

export {
  ServerCommunication
}
