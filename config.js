const bodyParser = require('body-parser')
const compression = require('compression')
const monitory = require('express-status-monitor')
const logger = require('morgan')
const path = require('path')

module.exports = (express) => {
  const app =  new express()

  app.disable('x-powered-by')
  app.set('host', process.env.APP_HOST || '127.0.0.1')
  app.set('port', process.env.APP_PORT || 3000)
  app.use(logger('dev'));
  app.use(monitory())
  app.use(compression())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, '/public'), { maxAge: 3600 }))

  return app
}
