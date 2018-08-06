const bRepo = require('./board_repository')
const tRepo = require('./team_repository')

module.exports = {
  NewBoardRepositoryInMemory: () => bRepo.NewBoardRepositoryInMemory(),
  NewTeamRepositoryInMemory: () =>  tRepo.NewTeamRepositoryInMemory()
}
