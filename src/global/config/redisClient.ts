import config from '.';
import * as redis from 'redis';


const redisInfo = {

    socket: {
        host: config.redisHost,
        port: config.redisPort,
        connectTimeout: 60000
    },
    password: config.redisPassword

};


let redisClient = redis.createClient(redisInfo);
redisClient.connect();


export default redisClient;