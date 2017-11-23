let redis = require('redis')
let request = require('request')
let config = require('./config.json')

// Redis createClient & connect to Redis Labs free account
var redisClient = redis.createClient(config.redis.port, config.redis.host);

exports.redisConnect = function(){
    redisClient.on('connect', function(err) {
        if(err) console.log('_redisConnect() error_ :', err)
        console.log('Redis connected...')
    })
    redisClient.on('error', function(err) {
        if(err) console.log('_redis error_ :', err)        
        console.log('Redis error: ' + err)
    })
}

// Primer request del flujo, obtiene [Lat,Lng] desde google o desde redis
exports.redisGetLatLng = function(ciudad, responseExpress) {
    console.log('redisGetLatLng() called !')
    
    let self = this
    redisClient.hgetall(ciudad, function(err, obj) {
        if (err) {
            console.log('redisGetLatLng() err', err)
            return err
        }
        else if (!obj) {
            console.log('Ciudad no registrada en redis. Se obtendrá de GoogleMaps para guardarla luego en la cache Redis.')
            request.get("/api/googlemaps/getLatLng/" + ciudad, (error, response, body) => {
                console.log('redisGetLatLng OK: ' +JSON.parse(body).lat)
                if (error) { return res.sendStatus(500); }
                self.saveLatLngEnRedis(ciudad, body, responseExpress);
            }); 
        } else {
            self.getLatLngRedis(ciudad, responseExpress);
        }
    });
}

// Guardar en redis: HMSET Ciudad,[lat,lng]
exports.saveLatLngEnRedis = function(keyCiudad, jsonLatLng, responseExpress) {
    console.log('saveLatLngEnRedis: ' + jsonLatLng)    
    let objLatLng = [
        'lat', JSON.parse(jsonLatLng).lat,
        'lng', JSON.parse(jsonLatLng).lng
    ]
    redisClient.hmset(keyCiudad, objLatLng, function(err, reply) {
        if (err) {
            console.log('Error al tratar de guardar en Redis. ' + err)
            throw new Error('Error al tratar de guardar en Redis: ' +err)
        }
        console.log('Coordenadas correctamente guardadas en Redis. ' + reply)
        responseExpress.json(JSON.parse(jsonLatLng))        
        return reply
    })
}

// Obtiene LatLng de redis y retorna la response [lat, lng]  
exports.getLatLngRedis = function(keyCiudad, responseExpress) {
    console.log('getLatLng de redis...' +keyCiudad)
    redisClient.hgetall(keyCiudad, function(err, result){
        if (err) { 
            console.log('getLanLng Error: ' +err)
            return [];
        }
        let objLatLng = {
            'lat': result.lat,
            'lng': result.lng
        }
        console.log('getLatLng de redis...OK ' +objLatLng)
        responseExpress.json(objLatLng);
    });
}

exports.getDataForecast = function(urlForecastIO, responseExpress) {
    // Randomize 10% request will fail
    if (Math.random(0, 1) < 0.1){
        console.log('getDataForecast Error random')
        throw new Error('How unfortunate! The API Request Failed')        
    }

    console.log('getDataForecast OK') 
    // Normal flow ( 90% )
    return request.get(urlForecastIO, (error, response, body) => {
        if (error) {
            console.log('getDataForecast Error en API: '+error)
            return responseExpress.sendStatus(500).send(error);
        }
        let resObj = JSON.parse(body);
        let responseForecast = {
            tzone: resObj.timezone,
            time: resObj.currently.time,
            temp: resObj.currently.temperature,
            summ: resObj.currently.summary,
            icon: resObj.currently.icon,
            offset: resObj.offset
        }
        console.log('getDataForecast ... response OK')            
        return responseExpress.send(responseForecast)
    })
}

exports.redisSaveError = function(msg, responseExpress){
    console.log('redisSaveError')
    redisClient.hmset("api.errors", [
        new Date(), msg
    ], function(err, reply) {
        if (err) console.log('Error al tratar de guardar en Redis. ' + err)
        console.log('...Error! logeado en Redis: ' + msg)
        responseExpress.sendStatus(500)
    })
}