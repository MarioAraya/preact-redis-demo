let express = require('express')
let router = express();
let redis = require('redis')
let axios = require('axios')
let request = require('request')
let cors = require('cors')

const url = "http://localhost:5000";

module.exports = function(app) {
    // Cross Origin enabled
    //app.use(cors());

    // Redis connect
    var redisClient = redis.createClient()
    redisClient.on('connect', function(err) {
        console.log('Redis connected...')
    })
    redisClient.on('error', function(err) {
        console.log('error: ' + err)
    })

    app.get('/api/redis/getLatLng/:ciudad', cors(), function(req, res, next) {
        redisClient.hgetall(req.params.ciudad, function(err, obj) {
            if (!obj) {
                console.log('Ciudad no registrada en redis. Se procede a sacar data de GoogleMaps y guardarla en Redis.')
                request.get(url + "/api/redis/getLatLngFromGoogle/" + req.params.ciudad, (error, response, body) => {
                    if (error) { return res.sendStatus(500); }
                    saveLatLngEnRedis(req.params.ciudad, body);
                });
            } else {
                getLatLngRedis(req.params.ciudad, res);
            }
        });
    })

    app.get('/api/redis/getLatLngFromGoogle/:ciudad', cors(), function(req, res) {
        return request.get(url + "/api/google-api/" + req.params.ciudad, (error, response, body) => {
            if (error) {
                return res.sendStatus(500);
            }
            return saveLatLngEnRedis(req.params.ciudad, body);
        });
    })

    // Obtiene coordenadas desde API google :ciudad string. ej:"Santiago,CL"
    app.get('/api/google-api/:ciudad', function(req, res) {
        console.log('getLatLng de google...' + req.params.ciudad)        
        let urlGoogle = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyAIDZiwD2-lgitBaK_HVsFZMMRjxCsKEug&address=' + req.params.ciudad;
        return request.get(urlGoogle, (error, response, body) => {
            if (error) {
                return res.sendStatus(500);
            }
            console.log('Location from google:' + JSON.parse(body).results[0].geometry.location)
            return res.send(JSON.parse(body).results[0].geometry.location)
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
            console.log('Coordenadas correctamente guardadas en Redis. ' + reply)
            return reply;
        })
    }

    getLatLngRedis = function(keyCiudad, responseExpress) {
        console.log('getLatLng de redis...')
        redisClient.hgetall(keyCiudad, function(err, result){
            if (err) {
                console.log('getLanLng Error: ' +err)
                return [];
            }
            console.log('getLatLng de redis...OK ' +[result.lat, result.lng])
            responseExpress.json([result.lat, result.lng]);
        });
    }
}