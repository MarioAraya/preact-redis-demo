let express = require('express')
let app = express()
let routes = require('./routes')(app)
let config = require('./config.json')

app.set('port', (process.env.PORT || config.app.port));

app.use('/favicon.ico', express.static('images/favicon.ico'));

app.listen(app.get('port'), function() {
  console.log('Servidor escuchando en puerto ', app.get('port'));
});