const bRepo = require('./board_repository')
const tRepo = require('./team_repository')
const tMRepo = require('./team_member_repository')
const iRepo = require('./issue_repository')

module.exports = {
  NewBoardRepositoryInMemory: () => bRepo.NewBoardRepositoryInMemory(),
  NewTeamRepositoryInMemory: () =>  tRepo.NewTeamRepositoryInMemory(),
  NewTeamMemberRepositoryInMemory: () => tMRepo.NewTeamMemberRepositoryInMemory(),
  NewIssueRepisitoryInMemory: () => iRepo.NewIssueRepositoryInMemory()
}
