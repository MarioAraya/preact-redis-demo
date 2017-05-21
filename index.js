let express = require('express')
let app = express()
let routes = require('./routes')(app)

app.set('port', (process.env.PORT || 41072));

app.listen(app.get('port'), function() {
  console.log('Servidor escuchando en puerto ', app.get('port'));
});