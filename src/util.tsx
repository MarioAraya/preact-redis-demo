export default {
    getIconUrlForecastIO: function(icon){
        switch (icon) {
            case 'clear-day': return 'http://i.imgur.com/cJDNw72.png'
            case 'clear-night': return 'http://i.imgur.com/Oxt9Dn8.png'
            case 'clear-cloudy': return 'http://i.imgur.com/cJDNw72.png'
            case 'cloudy': return 'http://i.imgur.com/JRRriGY.png'
            case 'clear-fog': return 'http://i.imgur.com/AwxIK0H.png'
            case 'partly-cloudy-day': return 'http://i.imgur.com/JRRriGY.png'
            case 'partly-cloudy-night': return 'http://i.imgur.com/uNE3UsV.png'
            case 'rain': return 'http://i.imgur.com/Ni14lLx.png'
            case 'sleet': return 'http://i.imgur.com/Uuok6UO.png'
            case 'snow': return 'http://i.imgur.com/0BHwVWb.png'
            case 'wind': return 'http://i.imgur.com/vNlETtj.png'
        }
        return ''
    },
    getHourTimezone(tiempoInt, offset){
        let date = new Date(tiempoInt + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
        let dateHora = date.substring(date.indexOf(':')-2) // Extrae solo la hora
        console.log(`getHourTimezone(${dateHora} , ${offset}) ... `)
        return dateHora;
    }
}