import * as redis from 'redis'
import * as request from 'request'
import config from '../config'

// Redis createClient & connect to Redis Labs free account
var redisClient = redis.createClient(config.config().redis.port, config.config().redis.host);



export default {
    // Obtiene LatLng de redis y retorna la response [lat, lng]  
    getLatLngRedis(keyCiudad: string, responseExpress: any) {
        redisClient.hgetall(keyCiudad, function(err, result){
            if (err) { 
                console.log('getLanLng Error: ' +err)
                return [];
            }
            let objLatLng = {
                'lat': result.lat,
                'lng': result.lng
            }
            console.log(`getLatLng de redis ${JSON.stringify( objLatLng )} ciudad: ${keyCiudad}`)
            responseExpress.json(objLatLng);
        });
    },

    redisConnect(){
        redisClient.on('connect', function(err) {
            if(err) console.log('_redisConnect() error_ :', err)
            console.log('Redis connected...')
        })
        redisClient.on('error', function(err) {
            if(err) console.log('_redis error_ :', err)        
            console.log('Redis error: ' + err)
        })
    },
    
    // Primer request del flujo, obtiene [Lat,Lng] desde google o desde redis
    getCoordenadasRedis(ciudad: string, responseExpress: any) {
        let self = this
        redisClient.hgetall(ciudad, function(err, obj) {
            if (err) return err
            if (obj) {
                self.getLatLngRedis(ciudad, responseExpress);                
            }
            else {
                console.log(`Ciudad ${ciudad} no registrada en redis. Se obtendrá de GoogleMaps para guardarla luego en la cache Redis.`)
                responseExpress.json(
                    request.get("/api/googlemaps/getLatLng/" + ciudad, (error, response: any, body): any => {
                        console.log('getCoordenadasRedis OK: ' +JSON.parse(body).lat)
                        return body
                        // if (error) { return response.sendStatus(500); }
                        // self.saveLatLngEnRedis(ciudad, body, responseExpress);
                    })
                )
            }
        });
    },
    
    // Guardar en redis: HMSET Ciudad,[lat,lng]
    saveLatLngEnRedis(keyCiudad: string, jsonLatLng: string, responseExpress: any) {
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
    },

    redisSaveError(msg: any, responseExpress: any){
        console.log('redisSaveError')
        redisClient.hmset("api.errors", [
            new Date(), msg
        ], function(err, reply) {
            if (err) console.log('Error al tratar de guardar en Redis. ' + err)
            console.log('...Error! logeado en Redis: ' + msg)
            responseExpress.sendStatus(500)
        })
    }
}