import * as request from 'request'

export default {
    googleGetLatLng(res: any, req: any) {
        console.log('getLatLng from google...' + req.params.ciudad)        
        let urlGoogle = 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyAIDZiwD2-lgitBaK_HVsFZMMRjxCsKEug&address=' + req.params.ciudad;
        return request.get(urlGoogle, (error, response, body) => {
            if (error) {
                console.log('Error en /api/googlemaps/getLatLng/ : ' +error)
                return res.sendStatus(500);
            }
            console.log('/api/googlemaps/getLatLng/' +req.params.ciudad +' : ' +JSON.parse(body).results[0].geometry.location)
            return res.send(JSON.parse(body).results[0].geometry.location) 
        })
    }
}