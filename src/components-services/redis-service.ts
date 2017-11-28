import axios from "axios";
import forecastService from './forecast-io-service'
import etcServices from './etc-service'

const httpClient = axios.create(etcServices)

export default {
    // lat Lng from redis
    getDataCiudad: function(ciudad: string) {
        return axios.get("/api/redis/getLatLng/" + ciudad).then( res => {
            console.log(`getStats OK nombre=${ciudad} lat=${res.data.lat} lng=${res.data.lng}`)
            return forecastService.getForecast(res.data)
        }).catch(err => {
            console.log('Error en /api/redis/getLatLng/ : ' +err)
        })
    }
}