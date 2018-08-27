const {
  WorkspaceRepositoryInMemory,
  ProjectRepositoryInMemory,
  LabelRepositoryInMemory,
  BoardRepositoryInMemory,
  IssueRepositoryInMemory,
  SprintRepositoryInMemory
} = require('./workspace/repository')
const { UserRepository } = require('./user/repository')

module.exports = () => {

  let workspaceRepo = WorkspaceRepositoryInMemory.init()
  let projectRepo = ProjectRepositoryInMemory.init()
  let labelRepo = LabelRepositoryInMemory.init()
  let boardRepo = BoardRepositoryInMemory.init()
  let issueRepo = IssueRepositoryInMemory.init()
  let sprintRepo = SprintRepositoryInMemory.init()

  let userRepo = UserRepository.init()

  if (process.env.DEMO_MODE === "true") {
    /*eslint-disable */
    console.log('=======================================')
    console.log('*          Demo Mode enabled          *')
    console.log('=======================================')
    /*eslint-enable */

    // domain definition
    const { Workspace, Project, Label, Board, Issue } = require('./workspace/domain')
    const { User } = require('./user/domain')

    // user creations
    let user1 = User.createUser('foobar', 'password')
    userRepo.Save(user1)

    // workspace creations
    let workspace1 = Workspace.createWorkspace('Gojek Indonesia', 'gojek-indonesia')
    let workspace2 = Workspace.createWorkspace('Tokopedia', 'tokopedia')
    let workspace3 = Workspace.createWorkspace('Traveloka', 'traveloka')
    workspaceRepo.Save(workspace1)
    workspaceRepo.Save(workspace2)
    workspaceRepo.Save(workspace3)

    // label creations
    let label1 = Label.createLabel(workspace1.UID, 'todo', '#00011')
    let label2 = Label.createLabel(workspace1.UID, 'doing', '#00012')
    let label3 = Label.createLabel(workspace1.UID, 'done', '#00013')
    labelRepo.Save(label1)
    labelRepo.Save(label2)
    labelRepo.Save(label3)

    // project creations
    let project1 = Project.createProject(workspace1.UID, 'Foobar project', 'foobar-project', 'private')
    projectRepo.Save(project1)

    // board creations
    let board1 = Board.createBoard(project1.UID, 'Backlog')
    let board2 = Board.createBoard(project1.UID, 'Doing')
    let board3 = Board.createBoard(project1.UID, 'Done')
    boardRepo.Save(board1)
    boardRepo.Save(board2)
    boardRepo.Save(board3)

    // issue creations
    let issue1 = Issue.createIssue(project1.UID, user1.UID, 'Halo this isue #1', 'This is issue body')
    let issue2 = Issue.createIssue(project1.UID, user1.UID, 'Halo this isue #2', 'This is issue body')
    let issue3 = Issue.createIssue(project1.UID, user1.UID, 'Halo this isue #3', 'This is issue body')
    let issue4 = Issue.createIssue(project1.UID, user1.UID, 'Halo this isue #4', 'This is issue body')
    let issue5 = Issue.createIssue(project1.UID, user1.UID, 'Halo this isue #5', 'This is issue body')
    let issue6 = Issue.createIssue(project1.UID, user1.UID, 'Halo this isue #6', 'This is issue body')
    issueRepo.Save(issue1)
    issueRepo.Save(issue2)
    issueRepo.Save(issue3)
    issueRepo.Save(issue4)
    issueRepo.Save(issue5)
    issueRepo.Save(issue6)
  }

  return {
    workspaceRepo,
    projectRepo,
    labelRepo,
    boardRepo,
    issueRepo,
    userRepo,
    sprintRepo
  }
}
