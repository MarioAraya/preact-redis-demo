import forecastService from './forecast-io-service'
import * as constants from './constants'

export default {
    // lat Lng from redis
    getDataCiudad: function(ciudad: string): Promise<any> {
        return constants.httpClient.get("/api/redis/getLatLng/" + ciudad)
            .then( res => {
                if (!res || !res.data.lat || !res.data.lng) {
                    console.log('No se encontró datos para ' + ciudad)
                    return
                }
                console.log(`getStats OK nombre=${ciudad} lat=${res.data.lat} lng=${res.data.lng}`)
                return forecastService.getForecast(res.data)
            }).catch(err => {
                console.log('Error en /api/redis/getLatLng/ : ' +err)
                return err
            })
    }
}