let express = require('express')
let router = express();
let redis = require('redis')
let axios = require('axios')
let request = require('request')
let cors = require('cors')
let routesMethods = require('./routes-methods.js')

module.exports = function(app) {
    routesMethods.redisConnect();

    // Request redis que obtiene Lat Lng según :ciudad 
    app.get('/api/redis/getLatLng/:ciudad', cors(), function(req, res, next) {
        routesMethods.redisGetLatLng(req.params.ciudad, res)
    })

    // Request googleAPI que retorna coordenadas y las guarda en Redis
    app.get('/api/googlemaps/getLatLng/:ciudad', cors(), function(req, res) {
        return request.get("http://localhost:5000/api/google/" + req.params.ciudad, (error, response, body) => {
            if (error) {
                return res.sendStatus(500);
            }
            return routesMethods.saveLatLngEnRedis(req.params.ciudad, body);
        });
    })

    // Obtiene coordenadas desde API google :ciudad string. ej:"Santiago,CL"
    app.get('/api/googlemaps/:ciudad', function(req, res) {
        console.log('getLatLng from google...' + req.params.ciudad)        
        let urlGoogle = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyAIDZiwD2-lgitBaK_HVsFZMMRjxCsKEug&address=' + req.params.ciudad;
        return request.get(urlGoogle, (error, response, body) => {
            if (error) {
                return res.sendStatus(500);
            }
            console.log('Location from google:' + JSON.parse(body).results[0].geometry.location)
            return res.send(JSON.parse(body).results[0].geometry.location)
        });
    })

    // Obtiene data (hora, temp, etc) desde API de forecast.IO, filtra resultados a solo los necesarios y en español
    app.get('/api/forecast/getTimeTemp/:lat/:lng', cors(), function(req, responseExpress){
        let urlForecastIO = 'https://api.darksky.net/forecast/a2c2a01fb210cf7c611301c9fa23cdee/' 
                            +req.params.lat +',' +req.params.lng +'?exclude=minutely,hourly,daily,alerts,flags&lang=es&units=auto';
        return routesMethods.getDataForecast(urlForecastIO, responseExpress)
    })

    // Raiz
    app.get('/', function(req, res) {
        res.send('API root /')
    })

    // Maneja errores de express genericos. 
    app.use(function logErrors (err, req, res, next) {
        let esTipoErrorRandom = err.message.indexOf('How unfortunate') >= 0;
        if (esTipoErrorRandom) routesMethods.redisSaveError(err.message);
    })
}