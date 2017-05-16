let express = require('express')
let router = express();
let redis = require('redis')
let axios = require('axios')
let request = require('request')
let cors = require('cors')
let routesMethods = require('./routes-methods.js')

const url = "http://localhost:5000";

module.exports = function(app) {
    // Cross Origin enabled
    //app.use(cors());

    routesMethods.redisConnect();

    app.get('/api/redis/getLatLng/:ciudad', cors(), function(req, res, next) {
        routesMethods.redisGetLatLng(req.params.ciudad, res)
    })

    app.get('/api/redis/getLatLngFromGoogle/:ciudad', cors(), function(req, res) {
        return request.get(url + "/api/google-api/" + req.params.ciudad, (error, response, body) => {
            if (error) {
                return res.sendStatus(500);
            }
            return routesMethods.saveLatLngEnRedis(req.params.ciudad, body);
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

    app.get('/api/forecast/getTimeTemp/:lat/:lng', cors(), function(req, res){
        let urlForecastIO = 'https://api.darksky.net/forecast/a2c2a01fb210cf7c611301c9fa23cdee/' 
                            +req.params.lat +',' +req.params.lng +'?exclude=minutely,hourly,daily,alerts,flags&lang=es&units=auto';
        return request.get(urlForecastIO, (error, response, body) => {
            if (error) {
                return res.sendStatus(500);
            }
            let resObj = JSON.parse(body);
            let responseForecast = {
                time: resObj.currently.time,
                temp: resObj.currently.temperature,
                summ: resObj.currently.summary,
                icon: resObj.currently.icon,
                offset: resObj.offset
            }
            console.log('Data from forecast.IO ... OK')
            return res.send(responseForecast)
        })
    })

    // Raiz
    app.get('/', function(req, res) {
        res.send('API root /')
    })
}