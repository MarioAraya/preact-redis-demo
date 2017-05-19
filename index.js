let express = require('express')
let app = express()
let routes = require('./routes')(app)

app.listen(5000, function() {
    console.log('Servidor escuchando en puerto 5000')
})