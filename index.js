const chalk = require('chalk')
const express = require('express')
const initApp = require('./config')
const storage = require('./persistence')

require('dotenv').config()

const app = initApp(express)
const persistence = storage()

const sTeam  = require('./src/team/server/team_server')
const TeamServer = sTeam.NewTeamServer(persistence.teamRepo, persistence.boardRepo, persistence.issueRepo)
app.use('/teams', TeamServer.mount())

const sUser = require('./src/user/server/')
const UserServer = sUser.NewUserServer(persistence.userRepo)
app.use('/users', UserServer.mount())

app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://%s:%d in %s mode',
    chalk.green('✓'), app.get('host'), app.get('port'), app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

