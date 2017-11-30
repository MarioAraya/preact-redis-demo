import axios from 'axios'
import * as request from 'request'
import * as etcService from './etc-service'

const httpClient = axios.create(etcService.axiosConfig)

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

    getCoordenadas(ciudad: string): Promise<string> {
        if(!ciudad) return
        
        return httpClient.get(etcService.googleApiUrl + ciudad)
            .then( resForecast => {
                //console.log('__response '+ ciudad +' ', resForecast.status)
                return resForecast.data.results[0].geometry.location;
            })
            .catch( err => {
                //console.log('Error en /api/googlemaps/getLatLng/'+ ciudad)
                return err
            });
    }
}

