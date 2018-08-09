const chalk = require('chalk')
const express = require('express')
const initApp = require('./config')
const storage = require('./persistance')

require('dotenv').config()

const app = initApp(express)
const persistance = storage()

const sTeam  = require('./src/team/server/team_server')
const TeamServer = sTeam.NewTeamServer(persistance.teamRepo, persistance.boardRepo, persistance.issueRepo)
app.use('/teams', TeamServer.mount())

app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://%s:%d in %s mode',
    chalk.green('✓'), app.get('host'), app.get('port'), app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

