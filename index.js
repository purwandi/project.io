const bodyParser = require('body-parser')
const chalk = require('chalk')
const compression = require('compression')
const dotenv = require('dotenv')
const express = require('express')
const monitory = require('express-status-monitor')
const logger = require('morgan')
const path = require('path')

dotenv.load({ path: '.env' })

const app = new express()

app.disable('x-powered-by')
app.set('host', process.env.APP_HOST || '127.0.0.1')
app.set('port', process.env.APP_PORT || 3000)
app.set('env', process.env.NODE_ENV || 'development')
app.use(logger('dev'));
app.use(monitory())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public'), { maxAge: 3600 }))

// router register
app.use('/users', require('./src/user/server'))

// team domain
const teamServer  = require('./src/assets/server/team_server')
app.use('/teams', teamServer.TeamRouter(teamServer.NewTeamServer()))

app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://%s:%d in %s mode',
    chalk.green('✓'), app.get('host'), app.get('port'), app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

