module.exports = {
  SERVER_PORT: Number(process.env.SERVER_PORT),
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  MINUTES_START_GAME: 0.5,
  MINUTES_PLAY_TURN: 1
};
