const chalk = require('chalk')
const initApp = require('./src/app')
const persistence = require('./src/persistence')

const app = initApp()

persistence().then(repo => {

  app.get('/', (req, res) => {
    console.log('Inside the homepage callback function')
    console.log(req.session.user_uid)
    res.send(`You hit home page!\n`)
  })

  app.get('/login', (req, res) => {
    req.session.user_uid = 'hlllo'
    res.send(`You hit home page!\n`)
  })

  app.use('/workspaces', require('./src/workspace/server/')(repo))

  // user router
  app.use('/', require('./src/user/server')(repo))


  app.use(function (err, req, res, next) {
    console.error(err)
  })

  app.listen(app.get('port'), () => {
    console.log(
      '%s App is running at %s in %s mode',
      chalk.green('✓'), app.get('APP_URL'), app.get('env')
    )
    console.log('  Press CTRL-C to stop\n')
  })

}).catch(error => {
  console.log(error)
})
