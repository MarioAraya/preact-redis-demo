import * as constants from './constants'

export default {
    getCoordenadas(ciudad: string): Promise<any> {
        if(!ciudad) return
        
        return constants.httpClient.get(constants.googleApiUrl + ciudad)
            .then( resForecast => {
                console.log('__response '+ ciudad +' location = ', resForecast.data.results[0].geometry.location)
                return resForecast.data.results[0].geometry.location;
            })
            .catch( err => {
                console.log('__Error en /api/googlemaps/getLatLng/'+ ciudad)
                return err
            });
    }
}

