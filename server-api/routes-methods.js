let redis = require('redis')
let request = require('request')

// Redis connect
var redisClient = redis.createClient()

exports.redisConnect = function(){
    redisClient.on('connect', function(err) {
        console.log('Redis connected...')
    })
    redisClient.on('error', function(err) {
        console.log('Redis error: ' + err)
    })
}

exports.redisGetLatLng = function(ciudad, responseExpress) {
    redisClient.hgetall(ciudad, function(err, obj) {
        if (!obj) {
            console.log('Ciudad no registrada en redis. Se procede a sacar data de GoogleMaps y guardarla en Redis.')
            request.get(url + "/api/googlemaps/getLatLng" + ciudad, (error, response, body) => {
                if (error) { return res.sendStatus(500); }
                saveLatLngEnRedis(ciudad, body);
            });
        } else {
            getLatLngRedis(ciudad, responseExpress);
        }
    });
}

// Guardar en redis: HMSET Ciudad,[lat,lng]
let saveLatLngEnRedis = function(keyCiudad, jsonLatLng) {
    redisClient.hmset(keyCiudad, [
        'lat', JSON.parse(jsonLatLng).lat,
        'lng', JSON.parse(jsonLatLng).lng
    ], function(err, reply) {
        if (err) console.log('Error al tratar de guardar en Redis. ' + err)
        console.log('Coordenadas correctamente guardadas en Redis. ' + reply)
        return reply;
    })
}

// Obtiene LatLng de redis y retorna la response [lat, lng]
let getLatLngRedis = function(keyCiudad, responseExpress) {
    console.log('getLatLng de redis...')
    redisClient.hgetall(keyCiudad, function(err, result){
        if (err) {
            console.log('getLanLng Error: ' +err)
            return [];
        }
        console.log('getLatLng de redis...OK ' +[result.lat, result.lng])
        responseExpress.send([result.lat, result.lng]);
    });
}

exports.getDataForecast = function(urlForecastIO, responseExpress) {
    // Randomize 10% request will fail
    if (Math.random(0, 1) < 0.5) 
        throw new Error('How unfortunate! The API Request Failed')

    // Normal flow ( 90% )
    return request.get(urlForecastIO, (error, response, body) => {
        if (error) {
            return responseExpress.sendStatus(500);
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
        return responseExpress.send(responseForecast)
    })
}

exports.redisSaveError = function(msg){
    redisClient.hmset("api.errors", [
        new Date(), msg
    ], function(err, reply) {
        if (err) console.log('Error al tratar de guardar en Redis. ' + err)
        console.log('...Error! logeado en Redis: ' + reply)
        return reply;
    })
}