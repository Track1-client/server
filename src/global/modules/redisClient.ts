import config from '../config';
import redis from 'redis';

const redisInfo = {
    host: config.redisHost,
    port: config.redisPort,
    password: config.redisPassword,
};


const redisClient = redis.createClient(redisInfo);

export default redisClient;