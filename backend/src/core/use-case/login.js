class Login {
  constructor (playerRepository) {
    this.playerRepository = playerRepository;
  }

  async execute (id, username, avatar) {
    const player = await this.playerRepository.createPlayer(id, {
      username,
      isBot: false,
      score: 0,
      cards: '',
      roomId: '',
      order: -1,
      avatar
    });
    return {
      id: player.id,
      username: player.username,
      score: player.score,
      avatar: player.avatar
    };
  }
}

module.exports = Login;
