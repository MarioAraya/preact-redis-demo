import * as express from 'express'
import routes from './routes'
import * as constants from './services/constants'
import * as cors from 'cors'

let app = express()

app.set('port', constants.appApiPort)

routes.SetRoutes(app)

app.listen(app.get('port'), function() {
  console.log('Servidor escuchando en puerto ', app.get('port'))
})