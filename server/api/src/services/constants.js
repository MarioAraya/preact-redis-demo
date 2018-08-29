"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var Redis = require("ioredis");
exports.appApiPort = 41072;
exports.googleApiUrl = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBUva5tosidc6-iWE8NH7GjW3C06ERAFmI&address=';
exports.axiosConfig = {
    baseURL: 'http://localhost:41072',
    timeout: 5000,
    headers: { Accept: 'application/json' }
};
exports.redisConfig = {
    host: 'redis-16986.c62.us-east-1-4.ec2.cloud.redislabs.com',
    port: 16986,
    password: 'FgZQ6BUNiSQs2r2Q2QSalmxtDOywteJX',
    db: 0
};
// Cliente axios
exports.httpClient = axios_1["default"].create(this.axiosConfig);
// Cliente redis (redislabs)
exports.redis = new Redis(this.redisConfig);
