const chalk = require('chalk')
const initApp = require('./app')
const storage = require('./persistence')

require('dotenv').config()

const app = initApp()
const persistence = storage()

const sTeam  = require('./src/team/server/team_server')
const TeamServer = sTeam.NewTeamServer(persistence.teamRepo, persistence.boardRepo, persistence.issueRepo)
app.use('/teams', TeamServer.mount())

const sProject = require('./src/team/server/project_server')
const ProjectServer = sProject(persistence.projectRepo)
app.use('/teams', ProjectServer.mount())

const sIssue = require('./src/team/server/issue_server')
const IssueServer = sIssue(persistence.issueRepo)
app.use('/teams', IssueServer.mount())

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

