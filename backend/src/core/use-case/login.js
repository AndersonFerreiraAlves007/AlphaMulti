class Login {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (id, username) {
    const player = await this.playerRepository.createPlayer(id, {
      username,
      isBot: false,
      score: 0,
      cards: [],
      roomId: '',
      order: -1
    });
    return {
      id: player.id,
      username: player.username,
      score: player.score
    };
  }
}

module.exports = Login;
