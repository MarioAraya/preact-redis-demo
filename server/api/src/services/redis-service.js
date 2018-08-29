"use strict";
exports.__esModule = true;
var constants = require("./constants");
var google_service_1 = require("./google-service");
exports["default"] = {
    // Primer request del flujo, obtiene [Lat,Lng] desde google o desde redis
    getCoordenadasRedis: function (ciudad) {
        var _this = this;
        //let self = this
        return constants.redis.hget('coordenadas', ciudad)
            .then(function (objCoordenadas) {
            console.log("objCoordenadas redis para ciudad " + ciudad + " :", objCoordenadas);
            // If !emptyObject
            if (!objCoordenadas || JSON.stringify(objCoordenadas) === "{}") {
                console.log("Ciudad " + ciudad + " no registrada en redis. Se obtendr\u00E1 de GoogleMaps para guardarla luego en la cache Redis.");
                return google_service_1["default"].getCoordenadas(ciudad)
                    .then(function (resGoogleApi) {
                    console.log('getCoordenadasGoogleApi OK: ' + JSON.stringify(resGoogleApi));
                    _this.saveLatLngEnRedis(ciudad, resGoogleApi.lat, resGoogleApi.lng);
                    return resGoogleApi;
                })["catch"](function (errGoogleApi) { return console.log('__ERROR en getCoordenadasRedis() ', errGoogleApi); });
            }
            else {
                return objCoordenadas;
            }
        })["catch"](function (err) { return err; });
    },
    redisConnect: function () {
        constants.redis.on('connect', function () {
            console.log('Redis connected and authenticated...');
        });
        constants.redis.on('error', function (err) {
            console.log('Redis connection error: ' + err);
        });
    },
    // Guardar en redis: HMSET Ciudad,[lat,lng]
    saveLatLngEnRedis: function (ciudad, lat, lng) {
        console.log("saveLatLngEnRedis ciudad " + ciudad + " --- data [" + lat + " , " + lng + "]");
        var coorObjToSave = JSON.stringify({ 'lat': lat, 'lng': lng });
        constants.redis.hset('coordenadas', ciudad, coorObjToSave)
            .then(function (res) { return console.log('Coordenadas correctamente guardadas en Redis. ', res); })["catch"](function (err) {
            console.log('Error al tratar de guardar en Redis. ' + err);
            throw new Error('Error al tratar de guardar en Redis: ' + err);
        });
    },
    redisSaveError: function (msg, responseExpress) {
        constants.redis.set("api.errors", msg, function (err, reply) {
            if (err)
                console.log('Error al tratar de guardar en Redis. ' + err);
            console.log('...Error! logeado en Redis: ' + msg);
            responseExpress.sendStatus(500);
        });
    }
};
