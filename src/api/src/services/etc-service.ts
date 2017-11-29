
import * as request from 'request'

export default {        
    getDataForecast: function(urlForecastIO: string, responseExpress: any) {
        // Randomize 10% request will fail
        // if (Math.random(0, 1) < 0.1){
        //     console.log('getDataForecast Error random')
        //     throw new Error('How unfortunate! The API Request Failed')        
        // }
    
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
            console.log('getDataForecast response: '+ JSON.stringify( responseForecast ))
            return responseExpress.send(responseForecast)
        })
    }
}