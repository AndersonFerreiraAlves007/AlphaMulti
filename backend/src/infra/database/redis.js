const Redis = require('ioredis'); 
const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = require('../../utils/constants');

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASSWORD
});

module.exports = redis;
