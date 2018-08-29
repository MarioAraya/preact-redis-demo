import * as express from 'express'
import routes from './routes'
import * as constants from './services/constants'
import * as cors from 'cors'

let app = express()

// app.set('port', process.env.PORT)

routes.SetRoutes(app)

app.listen(process.env.PORT, function() {
  console.log('Servidor escuchando en puerto ', process.env.PORT)
})