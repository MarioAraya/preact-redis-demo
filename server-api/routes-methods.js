// Redis connect
let redis = require('redis')

var redisClient = redis.createClient()

exports.redisConnect = function(){
    redisClient.on('connect', function(err) {
        console.log('Redis connected...')
    })
    redisClient.on('error', function(err) {
        console.log('error: ' + err)
    })
}

exports.redisGetLatLng = function(ciudad, responseExpress) {
    redisClient.hgetall(ciudad, function(err, obj) {
        if (!obj) {
            console.log('Ciudad no registrada en redis. Se procede a sacar data de GoogleMaps y guardarla en Redis.')
            request.get(url + "/api/redis/getLatLngFromGoogle/" + ciudad, (error, response, body) => {
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