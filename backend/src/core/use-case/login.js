class Login {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (username) {
    const player = await this.playerRepository.createPlayer(username);
    return {
      id: player.id,
      username: player.username,
      score: player.score
    };
  }
}

module.exports = Login;
