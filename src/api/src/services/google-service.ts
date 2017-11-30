import * as axios from 'axios'
import * as request from 'request'


const httpClient = axios.default.create({
    baseURL: 'http://localhost:41072',
    timeout: 4000,
    headers: { Accept: 'application/json' }
})


export default {
    googleGetLatLng(ciudad: string, res: any) {
        let urlGoogle = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyAIDZiwD2-lgitBaK_HVsFZMMRjxCsKEug&address=' + ciudad;
        return request.get(urlGoogle, (error, response, body) => {
            if (error) {
                console.log('Error en /api/googlemaps/getLatLng/ : ' +error)
                return res.sendStatus(500);
            }
            //console.log('/api/googlemaps/getLatLng/' +req.params.ciudad +' : ' +JSON.parse(body).results[0].geometry.location)
            let locationObjParsed = JSON.parse(body).results[0].geometry.location;
            return res.send(locationObjParsed) 
        })
    },

    googleGetLatLng_axios: function(ciudad: string): Promise<string> {
        console.log('googleGetLatLng_axios reached')
        if(!ciudad) return
        let urlGoogle = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyAIDZiwD2-lgitBaK_HVsFZMMRjxCsKEug&address=' + ciudad;
        
        return httpClient.get(urlGoogle)
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

