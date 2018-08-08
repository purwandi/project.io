const RepositoryErrorIsNotInstanceOfTeam = 1
const RepositoryErrorIsNotInstanceOfBoard = 2
const RepositoryErrorIsNotInstanceOfIssue = 3

const Error = (error) => {
  switch (error) {
    case RepositoryErrorIsNotInstanceOfTeam:
      return 'The parameter is not instance of Team class'
    case RepositoryErrorIsNotInstanceOfBoard:
      return 'The parameter is not instance of Board class'
    case RepositoryErrorIsNotInstanceOfIssue:
      return 'The parameter is not instance of Issue class'
    default:
      return 'Unrecognized repository error'
  }
}

module.exports = {
  Error,
  RepositoryErrorIsNotInstanceOfTeam,
  RepositoryErrorIsNotInstanceOfBoard,
  RepositoryErrorIsNotInstanceOfIssue
}
