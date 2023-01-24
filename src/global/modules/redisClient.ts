import config from '../config';
import * as redis from 'redis';

const redisInfo = {
    socket: {
        host: config.redisHost,
        port: config.redisPort,
    },
    password: config.redisPassword,
};

let redisClient = redis.createClient(redisInfo);
redisClient.connect();

export default redisClient;