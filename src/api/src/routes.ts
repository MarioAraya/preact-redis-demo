import * as express from 'express'
import * as redis from 'redis'
import * as request from 'request'
import * as path from 'path'
import * as cors from 'cors'
import routesMethods from './routes-methods'
//import googleService from './services/google-service'

//let app = express()
routesMethods.redisConnect();

export default {
    SetRoutes(app: any) {
        // Request redis que obtiene Lat Lng según :ciudad 
        app.get('/api/redis/getLatLng/:ciudad', cors(), function(req, res, next) {
            routesMethods.redisGetLatLng(req.params.ciudad, res)
        })
        
        // Request googleAPI que retorna coordenadas y las guarda en Redis
        app.get('/api/googlemaps/getLatLng/:ciudad', cors(), function(req, res) {
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
        })
        
        // Obtiene data (hora, temp, etc) desde API de forecast.IO, filtra resultados a solo los necesarios y en español
        app.get('/api/forecast/getTimeTemp/:lat/:lng', cors(), function(req, responseExpress){
            let urlForecastIO = 'https://api.darksky.net/forecast/a2c2a01fb210cf7c611301c9fa23cdee/' 
                                +req.params.lat +',' +req.params.lng +'?exclude=minutely,hourly,daily,alerts,flags&lang=es&units=auto';
            return routesMethods.getDataForecast(urlForecastIO, responseExpress)
        })
        
        // Raiz redirige a './public/index.html'
        let publicDir = __dirname.replace('src/api/src', 'public')
        app.use(express.static(publicDir));
        app.get('/*', function(req, res){
            console.log('publicDir: ' +publicDir)
            res.sendFile(publicDir + '/index.html');
        });
        
        //app.use('/favicon.ico', express.static(publicDir + '/images/favicon.ico'));        
        
        // Maneja errores de express genericos. 
        app.use(function logErrors (err: Error, req: any, responseExpress: any, next: any) {
            console.log('Error logged: ', err)
            let esTipoErrorRandom = err.message.indexOf('How unfortunate') >= 0;
            if (esTipoErrorRandom) routesMethods.redisSaveError(err.message, responseExpress);
        })
    }
}