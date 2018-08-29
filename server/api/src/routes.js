"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var etc_service_1 = require("./services/etc-service");
var redis_service_1 = require("./services/redis-service");
var google_service_1 = require("./services/google-service");
redis_service_1["default"].redisConnect();
exports["default"] = {
    SetRoutes: function (app) {
        // Request redis que obtiene Lat Lng según :ciudad 
        app.get('/api/redis/getLatLng/:ciudad', cors(), function (req, res) {
            redis_service_1["default"].getCoordenadasRedis(req.params.ciudad)
                .then(function (result) { return res.send(result); })["catch"](function (err) { return err; });
        });
        // Request googleAPI que retorna coordenadas y las guarda en Redis
        app.get('/api/googlemaps/getLatLng/:ciudad', cors(), function (req, res) {
            google_service_1["default"].getCoordenadas(req.params.ciudad)
                .then(function (result) { return res.send(result); })["catch"](function (err) { return err; });
        });
        // Obtiene data (hora, temp, etc) desde API de forecast.IO, filtra resultados a solo los necesarios y en español
        app.get('/api/forecast/getTimeTemp/:lat/:lng', cors(), function (req, res) {
            etc_service_1["default"].getDataForecast(req.params.lat, req.params.lng)
                .then(function (result) { return res.send(result); })["catch"](function (err) { console.log('err:', err); });
        });
        // Raiz redirige a './public/index.html'
        var publicDir = __dirname.replace('src/api/src', 'public');
        app.use(express.static(publicDir));
        app.get('/*', function (req, res) {
            res.send("{ 'test': test }");
        });
        //app.use('/favicon.ico', express.static(publicDir + '/images/favicon.ico'));        
        // Maneja errores de express genericos. 
        app.use(function logErrors(err, req, responseExpress, next) {
            console.log('Error logged: ', err);
            var esTipoErrorRandom = err.message.indexOf('How unfortunate') >= 0;
            if (esTipoErrorRandom)
                redis_service_1["default"].redisSaveError(err.message, responseExpress);
        });
    }
};
