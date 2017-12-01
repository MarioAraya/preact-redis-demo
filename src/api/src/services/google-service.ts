import axios from 'axios'
import * as etcService from './etc-service'
import * as constants from './constants'

export default {
    // googleGetLatLng(ciudad: string, res: any) {
    //     return request.get(this.etcService.googleApiUrl() + ciudad, (error, response, body) => {
    //         if (error) {
    //             console.log('Error en /api/googlemaps/getLatLng/ : ' +error)
    //             return res.sendStatus(500);
    //         }
    //         //console.log('/api/googlemaps/getLatLng/' +req.params.ciudad +' : ' +JSON.parse(body).results[0].geometry.location)
    //         let locationObjParsed = JSON.parse(body).results[0].geometry.location;
    //         return res.send(locationObjParsed) 
    //     })
    // },

    getCoordenadas(ciudad: string): Promise<any> {
        if(!ciudad) return
        
        return constants.httpClient.get(constants.googleApiUrl + ciudad)
            .then( resForecast => {
                console.log('__response '+ ciudad +' ', resForecast.status)
                return resForecast.data.results[0].geometry.location;
            })
            .catch( err => {
                console.log('__Error en /api/googlemaps/getLatLng/'+ ciudad)
                return err
            });
    }
}

