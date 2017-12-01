import axios from 'axios'
import * as redis from 'redis'

export const appApiPort = 41072
export const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyAIDZiwD2-lgitBaK_HVsFZMMRjxCsKEug&address='
export const axiosConfig = {
    baseURL: 'http://localhost:41072',
    timeout: 5000,
    headers: { Accept: 'application/json' }
}
export const redisConfig = {
    host: 'redis-19812.c10.us-east-1-4.ec2.cloud.redislabs.com',
    port: 19812        
}


// Cliente axios
export const httpClient = axios.create(this.axiosConfig)

// Cliente redis server "redisLabs"
//export const redisClient = redis.createClient(this.redisConfig.port, this.redisConfig.host);
// Cliente redis server "localhost 127.0.0.1:6379"
export const redisClient = redis.createClient(6379);
