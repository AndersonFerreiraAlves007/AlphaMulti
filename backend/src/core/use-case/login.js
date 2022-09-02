class Login {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (username) {
    const player = await this.playerRepository.createPlayer(username);
    return player;
  }
}

module.exports = Login;
