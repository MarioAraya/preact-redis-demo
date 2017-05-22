import moment from "moment-timezone";

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
        return ''
    },
    getHourTimezoneMomentTz: function(city) {
        return moment().tz(city).format("HH:mm");
    },
    getHourTimezone(offset) {
        /** from: http://stackoverflow.com/questions/8207655/how-to-get-time-of-specific-timezone-using-javascript */        
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000*offset)).toLocaleString();
        return nd.substring(nd.indexOf(':')-2)
    }   
}