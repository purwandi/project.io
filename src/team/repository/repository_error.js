const RepositoryErrorIsNotInstanceOfTeam = 1
const RepositoryErrorIsNotInstanceOfTeamMember = 2
const RepositoryErrorIsNotInstanceOfBoard = 3
const RepositoryErrorIsNotInstanceOfIssue = 4

const Error = (error) => {
  switch (error) {
    case RepositoryErrorIsNotInstanceOfTeam:
      return 'The parameter is not instance of Team class'
    case RepositoryErrorIsNotInstanceOfTeamMember:
      return 'The paramater is not instance of Team Member class'
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
  RepositoryErrorIsNotInstanceOfTeamMember,
  RepositoryErrorIsNotInstanceOfBoard,
  RepositoryErrorIsNotInstanceOfIssue
}
