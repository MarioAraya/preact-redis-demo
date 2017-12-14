import axios from 'axios'
import etcService from './etc-service'
import * as constants from './constants'

export default {  
    forecastApiUrl(lat, lng) {
        return 'https://api.darksky.net/forecast/a2c2a01fb210cf7c611301c9fa23cdee/' +lat +',' +lng +'?exclude=minutely,hourly,daily,alerts,flags&lang=es&units=auto';
    },     
    getDataForecast(lat: string, lng: string): Promise<any> {
        console.log('lat', lat, 'lng', lng)
        if (!lat || !lng) return

        //Randomize 10% request will fail
        // if (Math.random(0, 1) < 0.1){
        //     console.log('getDataForecast Error random')
        //     throw new Error('How unfortunate! The API Request Failed')        
        // }

        // Normal flow ( 90% )
        return constants.httpClient.get(this.forecastApiUrl(lat, lng))
                .then( apiResponse => {
                    console.log('apiResponse.status', apiResponse.status)
                    let responseForecast
                    let resObj = apiResponse.data;
                    if (!resObj.error)
                        responseForecast = {
                            tzone: resObj.timezone,
                            time: resObj.currently.time,
                            temp: resObj.currently.temperature,
                            summ: resObj.currently.summary,
                            icon: resObj.currently.icon,
                            offset: resObj.offset
                        }
                    console.log('getDataForecast response: '+ JSON.stringify( responseForecast ))
                    return responseForecast
                })
                .catch( err => {
                    console.log('__forecastApiUrl err:', err)
                })
    }
}