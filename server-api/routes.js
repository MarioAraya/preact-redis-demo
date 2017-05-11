let express = require('express')
let router = express();
let redis = require('redis')
let axios = require('axios')
let request = require('request')

const url = "http://localhost:5000";

module.exports = function(app) {
    // Redis connect
    var redisClient = redis.createClient()
    redisClient.on('connect', function(err) {
        console.log('Redis connected...')
    })
    redisClient.on('error', function(err) {
        console.log('error: ' + err)
    })

    app.get('/api/redis/get-city/:ciudad', function(req, res, next) {
        redisClient.hgetall(req.params.ciudad, function(err, obj) {
            if (!obj) {
                console.log('Ciudad no registrada en redis. Se procede a sacar data de GoogleMaps y guardarla en Redis.')
                request.get(url + "/api/redis/store/" + req.params.ciudad, (error, response, body) => {
                    if (error) { return res.sendStatus(500); }
                    return saveLatLngEnRedis(req.params.ciudad, body);
                });
            } else {
                return getLatLngRedis(req.params.ciudad);
            }
            res.send(obj);
        });
    })

    app.get('/api/redis/store/:ciudad', function(req, res) {
        request.get(url + "/api/google-api/" + req.params.ciudad, (error, response, body) => {
            if (error) {
                return res.sendStatus(500);
            }
            return saveLatLngEnRedis(req.params.ciudad, body);
        });
    })

    // Obtiene coordenadas desde API google :ciudad string. ej:"Santiago,CL"
    app.get('/api/google-api/:ciudad', function(req, res) {
        request.get({
            url: 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyAIDZiwD2-lgitBaK_HVsFZMMRjxCsKEug&address=' + req.params.ciudad,
            json: true
        }, function(error, response, body) {
            if (error) {
                console.log('Error al tratar de consumir API google. ' + error)
                return res.sendStatus(500);
            } else {
                return res.status(200).send(body.results[0].geometry.location);
            }
        });
    })

    // Raiz
    app.get('/', function(req, res) {
        res.send('API root /')
    })

    // Guardar en redis: HMSET Ciudad,[lat,lng]
    saveLatLngEnRedis = function(keyCiudad, jsonLatLng) {
        redisClient.hmset(keyCiudad, [
            'lat', JSON.parse(jsonLatLng).lat,
            'lng', JSON.parse(jsonLatLng).lng
        ], function(err, reply) {
            if (err) console.log('Error al tratar de guardar en Redis. ' + err)
            return reply;
        })
    }

    getLatLngRedis = function(keyCiudad) {
        return redisClient.hgetall(keyCiudad);
    }
}