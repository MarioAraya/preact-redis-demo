import moment from "moment-timezone";
import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://localhost:41072',
    timeout: 2500,
    headers: { Accept: 'application/json' }  
})

export default {
    getIconUrlForecastIO: function(icon){
        switch (icon) {
            case 'clear-day': return 'https://i.imgur.com/cJDNw72.png'
            case 'clear-night': return 'https://i.imgur.com/Oxt9Dn8.png'
            case 'clear-cloudy': return 'https://i.imgur.com/cJDNw72.png'
            case 'cloudy': return 'https://i.imgur.com/JRRriGY.png'
            case 'clear-fog': return 'https://i.imgur.com/AwxIK0H.png'
            case 'partly-cloudy-day': return 'https://i.imgur.com/JRRriGY.png'
            case 'partly-cloudy-night': return 'https://i.imgur.com/uNE3UsV.png'
            case 'rain': return 'https://i.imgur.com/Ni14lLx.png'
            case 'sleet': return 'https://i.imgur.com/Uuok6UO.png'
            case 'snow': return 'https://i.imgur.com/0BHwVWb.png'
            case 'wind': return 'https://i.imgur.com/vNlETtj.png'            
        }
        return 'empty.png'
    },
    getHourTimezoneMomentTz: function(city) {
        return moment().tz(city).format("HH:mm");
    },
    getHourTimezone: function(offset) {
        /** from: http://stackoverflow.com/questions/8207655/how-to-get-time-of-specific-timezone-using-javascript */        
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000*offset)).toLocaleString();
        return nd.substring(nd.indexOf(':')-2)
    },
    // lat Lng from redis
    getDataCiudad: function(ciudad: string) {
        return axios.get("/api/redis/getLatLng/" + ciudad).then( res => {
            console.log(`getStats OK nombre=${ciudad} lat=${res.data.lat} lng=${res.data.lng}`)
            this.getForecast(res.data)
        }).catch(err => {
            console.log('Error en /api/redis/getLatLng/ : ' +err)
        })
    },
    // Forecast info from forecast.io
    getForecast: function(data) {
        return httpClient.get('/api/forecast/getTimeTemp/' + data.lat +"/" + data.lng)
            .then( resForecast => {
                console.log('/forecast.IO ... OK', resForecast.data) 
                return {
                    hour: this.getHourTimezone(resForecast.data.offset),
                    temp: resForecast.data.temp,
                    summ: resForecast.data.summ,
                    icon: this.getIconUrlForecastIO(resForecast.data.icon)
                }  
            })
            .catch( err => {
                console.log('Error en /api/forecast/getTimeTemp/ : ' +err);
                //this.setState({error: err})
                return err
            });
    }
}