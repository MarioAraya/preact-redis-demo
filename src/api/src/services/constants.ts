import axios from 'axios'
import * as Redis from 'ioredis'

export const appApiPort = 41072
export const googleApiUrl = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBUva5tosidc6-iWE8NH7GjW3C06ERAFmI&address='
export const axiosConfig = {
    baseURL: 'http://localhost:41072',
    timeout: 5000,
    headers: { Accept: 'application/json' }
}
export const redisConfig = {
    host: 'redis-16986.c62.us-east-1-4.ec2.cloud.redislabs.com',
    port: 16986,
    password: 'FgZQ6BUNiSQs2r2Q2QSalmxtDOywteJX',
    db: 0
}

// Cliente axios
export const httpClient = axios.create(this.axiosConfig)

// Cliente redis (redislabs)
export const redis = new Redis(this.redisConfig)
