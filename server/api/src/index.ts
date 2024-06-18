import * as express from 'express'
import routes from './routes'
import * as constants from './services/constants'
import * as cors from 'cors'

let app = express()

routes.SetRoutes(app)

app.listen(3000, function() {
  console.log('Servidor escuchando en puerto ', 3000)
})