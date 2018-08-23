const chalk = require('chalk')
const initApp = require('./src/app')
const storage = require('./src/persistence')

require('dotenv').config()

const app = initApp()
const persistence = storage()

app.use('/workspaces', require('./src/workspace/server/')(persistence))
app.use('/users', require('./src/user/server/')(persistence))

app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://%s:%d in %s mode',
    chalk.green('✓'), app.get('host'), app.get('port'), app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})
