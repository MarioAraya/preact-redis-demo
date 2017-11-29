import * as express from 'express'
import routes from './routes'
import config from './config'
import * as cors from 'cors'

let app = express()

app.set('port', config.config().app.port);

//app.use('/favicon.ico', express.static('images/favicon.ico'));

routes.SetRoutes(app);

app.listen(app.get('port'), function() {
  console.log('Servidor escuchando en puerto ', app.get('port'));
});