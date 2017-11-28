import axios from "axios"
import etcService from './etc-service'

const httpClient = axios.create(etcService.axiosConfig)

export default {
    getForecast: function(data: any) {
        if(!data) return
        return httpClient.get('/api/forecast/getTimeTemp/' + data.lat +"/" + data.lng)
            .then( resForecast => {
                console.log('/forecast.IO ... OK', resForecast.data) 
                return {
                    hour: etcService.getHourTimezone(resForecast.data.offset),
                    temp: resForecast.data.temp,
                    summ: resForecast.data.summ,
                    icon: etcService.getIconUrlForecastIO(resForecast.data.icon)
                }  
            })
            .catch( err => {
                console.log('Error en /api/forecast/getTimeTemp/ : ' +err);
                //this.setState({error: err})
                return err
            });
    }
} 