import axios from "axios"
import etcService from './etc-service'
import * as constants from './constants'

export default {
    /** Retorna axios Promise con un objeto forecastIO */
    getForecast(data: any): Promise<any> {
        return constants.httpClient.get('/api/forecast/getTimeTemp/' + data.lat +"/" + data.lng)
            .then( resForecast => {
                return {
                    hour: etcService.getHourTimezone(resForecast.data.offset),
                    temp: resForecast.data.temp,
                    summ: resForecast.data.summ,
                    icon: etcService.getIconUrlForecastIO(resForecast.data.icon)
                }  
            })
            .catch( err => {
                console.log('Error en /api/forecast/getTimeTemp/ : ' +err);
                return err
            });
    }
} 