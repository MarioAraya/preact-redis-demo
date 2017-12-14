import * as constants from './constants'
import etcService from './etc-service'
import googleService from './google-service' 


export default {
    // Primer request del flujo, obtiene [Lat,Lng] desde google o desde redis
    getCoordenadasRedis(ciudad: string): Promise<any> {
        //let self = this
        return constants.redis.hget('test', ciudad)
            .then( objCoordenadas => {
                console.log(`objCoordenadas redis para ciudad ${ciudad} :`, objCoordenadas)
                // If !emptyObject
                if (!objCoordenadas || JSON.stringify(objCoordenadas) === "{}") {
                    console.log(`Ciudad ${ciudad} no registrada en redis. Se obtendrá de GoogleMaps para guardarla luego en la cache Redis.`)
                    googleService.getCoordenadas(ciudad).then( resGoogleApi => {
                        console.log('getCoordenadasGoogleApi OK: ' + JSON.stringify(resGoogleApi))
                        this.saveLatLngEnRedis(ciudad, resGoogleApi.lat, resGoogleApi.lng)

                        return resGoogleApi;
                    })
                    .catch ( errGoogleApi => console.log('__ERROR en getCoordenadasRedis() ', errGoogleApi))
                }
                else {
                    return objCoordenadas
                }
            })
            .catch (err => err)
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
    saveLatLngEnRedis(ciudad: string, lat: string, lng: string) {
        console.log(`saveLatLngEnRedis ciudad ${ ciudad } --- data [${lat} , ${lng}]`)
        let coorObjToSave = JSON.stringify({'lat': lat, 'lng': lng})
        constants.redis.hset('test', ciudad, coorObjToSave)
            .then( res => console.log('Coordenadas correctamente guardadas en Redis. ', res))
            .catch(err => {
                console.log('Error al tratar de guardar en Redis. ' + err)
                throw new Error('Error al tratar de guardar en Redis: ' +err)
            })
    },

    redisSaveError(msg: any, responseExpress: any){
        constants.redis.set("api.errors", msg, function(err, reply) {
            if (err) console.log('Error al tratar de guardar en Redis. ' + err)
            console.log('...Error! logeado en Redis: ' + msg)
            responseExpress.sendStatus(500)
        })
    }
}