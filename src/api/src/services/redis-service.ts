import * as constants from './constants'
import etcService from './etc-service'
import googleService from './google-service' 


export default {
    testIoRedis() {
        
        constants.redis.set('foo', 'bar');
        constants.redis.get('foo', function (err, result) {
          console.log(result);
        });
        
        // Or using a promise if the last argument isn't a function
        constants.redis.get('foo').then(function (result) {
          console.log(result);
        });
        
        // Arguments to commands are flattened, so the following are the same:
        constants.redis.sadd('set', 1, 3, 5, 7);
        constants.redis.sadd('set', [1, 3, 5, 7]);
        
        // All arguments are passed directly to the redis server:
        constants.redis.set('key', 100, 'EX', 10);
    },
    // Primer request del flujo, obtiene [Lat,Lng] desde google o desde redis
    getCoordenadasRedis(ciudad: string): Promise<any> {
        //let self = this
        return constants.redis.hgetall(ciudad)
            .then( objCoordenadas => {
                console.log(`objCoordenadas redis para ciudad ${ciudad} :`, objCoordenadas)
                // If !emptyObject
                if (Object.keys(objCoordenadas).length === 0 && objCoordenadas.constructor === Object) {
                    console.log(`Ciudad ${ciudad} no registrada en redis. Se obtendrá de GoogleMaps para guardarla luego en la cache Redis.`)
                    // return googleService.getCoordenadas(ciudad).then( resGoogleApi => {
                    //     console.log('getCoordenadasGoogleApi OK: ' + JSON.stringify(resGoogleApi))
                    //     //this.saveLatLngEnRedis(ciudad, resGoogleApi, responseExpress);
                    // })
                    // .catch ( errGoogleApi => {
                    //     //return responseExpress.sendStatus(500)
                    // })
                }
                else {
                    return this.getLatLngRedis(ciudad)
                }
            })
            .catch (err => err)
    },
    // Obtiene LatLng de redis y retorna la response [lat, lng]  
    getLatLngRedis(ciudad: string): Promise<any> {
        return constants.redis.hgetall(ciudad)
            .then( result => {
                let objLatLng = {
                    'lat': result.lat,
                    'lng': result.lng
                }
                console.log('objLatLng', objLatLng)
                return objLatLng
            })
            .catch ( err => {
                console.log('getLanLng Error: ' +err)
                return [];
            })
    },
    redisConnect(){
        constants.redis.on('connect', function(err) {
            if(err) console.log('_redisConnect() error_ :', err)
            console.log('Redis connected...')
        })
        constants.redis.on('error', function(err) {
            if(err) console.log('_redis error_ :', err)        
            console.log('Redis error: ' + err)
        })
    },
    
    // Guardar en redis: HMSET Ciudad,[lat,lng]
    saveLatLngEnRedis(keyCiudad: string, jsonLatLng: string, responseExpress: any) {
        console.log('saveLatLngEnRedis: ' + jsonLatLng)    
        let objLatLng = [
            'lat', JSON.parse(jsonLatLng).lat,
            'lng', JSON.parse(jsonLatLng).lng
        ]
        console.log('objLatLng.toString() = ' +objLatLng.toString())
        constants.redis.hmset(keyCiudad, objLatLng.toString(), function(err, reply) {
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
        constants.redis.hmset("api.errors", 
            msg
        , function(err, reply) {
            if (err) console.log('Error al tratar de guardar en Redis. ' + err)
            console.log('...Error! logeado en Redis: ' + msg)
            responseExpress.sendStatus(500)
        })
    }
}