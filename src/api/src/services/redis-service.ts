import * as redis from 'redis'
import * as request from 'request'
import * as constants from './constants'
import etcService from './etc-service'
import googleService from './google-service' 

export default {
    // Obtiene LatLng de redis y retorna la response [lat, lng]  
    getLatLngRedis(keyCiudad: string, responseExpress: any) {
        constants.redisClient.hgetall(keyCiudad, function(err, result){
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
        constants.redisClient.on('connect', function(err) {
            if(err) console.log('_redisConnect() error_ :', err)
            console.log('Redis connected...')
        })
        constants.redisClient.on('error', function(err) {
            if(err) console.log('_redis error_ :', err)        
            console.log('Redis error: ' + err)
        })
    },
    
    // Primer request del flujo, obtiene [Lat,Lng] desde google o desde redis
    getCoordenadasRedis(ciudad: string, responseExpress: any) {
        let self = this
        constants.redisClient.hgetall(ciudad, function(err, obj) {
            if (err) return err
            if (obj) {
                self.getLatLngRedis(ciudad, responseExpress);                
            }
            else {
                //console.log(`Ciudad ${ciudad} no registrada en redis. Se obtendrá de GoogleMaps para guardarla luego en la cache Redis.`)
                return googleService.getCoordenadas(ciudad).then( resGoogleApi => {
                    console.log('getCoordenadasGoogleApi OK: ' + JSON.stringify(resGoogleApi))
                    self.saveLatLngEnRedis(ciudad, resGoogleApi, responseExpress);
                })
                .catch ( errGoogleApi => {
                    return responseExpress.sendStatus(500)
                })
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
        constants.redisClient.hmset(keyCiudad, objLatLng, function(err, reply) {
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
        constants.redisClient.hmset("api.errors", [
            new Date(), msg
        ], function(err, reply) {
            if (err) console.log('Error al tratar de guardar en Redis. ' + err)
            console.log('...Error! logeado en Redis: ' + msg)
            responseExpress.sendStatus(500)
        })
    }
}