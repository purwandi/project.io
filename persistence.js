const teamRepository = require('./src/team/repository')
const userRepository = require('./src/user/repository')

module.exports = () => {

  let teamRepo = teamRepository.TeamRepositoryInMemory.init()
  let projectRepo = teamRepository.ProjectRepositoryInMemory.init()
  let boardRepo = teamRepository.BoardRepositoryInMemory.init()
  let issueRepo = teamRepository.IssueRepositoryInMemory.init()

  let userRepo = userRepository.UserRepository.init()

  if (process.env.DEMO_MODE === "true") {
    console.log('=======================================')
    console.log('*          Demo Mode enabled          *')
    console.log('=======================================')

    // domain definition
    const teamDomain = require('./src/team/domain')
    const Team = teamDomain.Team
    const Project = teamDomain.Project 
    const Board = teamDomain.Board
    const Issue = teamDomain.Issue

    const userDomain = require('./src/user/domain')
    const User = userDomain.User

    // user creations
    let user1 = User.createUser('foobar', 'password')
    userRepo.Save(user1)

    // team creations
    let team1 = Team.createTeam('Foobar 1', 'foobar-1')
    let team2 = Team.createTeam('Foobar 2', 'foobar-2')
    teamRepo.Save(team1)
    teamRepo.Save(team2)

    // project creations
    let project1 = Project.createProject(team1.UID, 'Foobar project', 'foobar-project', 'private')
    projectRepo.Save(project1)

    // board creations
    let board1 = Board.createBoard(project1.UID, 'Backlog')
    let board2 = Board.createBoard(project1.UID, 'Doing')
    let board3 = Board.createBoard(project1.UID, 'Done')
    boardRepo.Save(board1)
    boardRepo.Save(board2)
    boardRepo.Save(board3)

    // issue creations
    let issue1 = Issue.createIssue(project1.UID, 'Halo this isue #1', 'This is issue body')
    issueRepo.Save(issue1)
  }

  return {
    teamRepo,
    projectRepo,
    boardRepo,
    issueRepo,
    userRepo
  }
}
