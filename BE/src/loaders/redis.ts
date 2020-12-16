import redis from 'redis';

export const redisDB = redis.createClient();

export const redisLoader = (): void => {
  redisDB.on('connect', () => console.log('redisDB connect ✅'));
};
