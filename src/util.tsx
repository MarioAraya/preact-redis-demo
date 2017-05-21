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
    getHourTimezone(tiempoInt, offset){
        let date = new Date(tiempoInt + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" )
        let dateHora = date.substring(date.indexOf(':')-2) // Extrae solo la hora
        console.log(`getHourTimezone(${dateHora} , ${offset}) ... `)
        return dateHora;
    }
}