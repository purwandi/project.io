const RepositoryErrorIsNotInstanceOfWorkspace = 1
const RepositoryErrorIsNotInstanceOfWorkspaceMember = 2
const RepositoryErrorIsNotInstanceOfBoard = 3
const RepositoryErrorIsNotInstanceOfIssue = 4
const RepositoryErrorIsNotInstanceOfProject = 5
const RepositoryErrorIsNotInstanceOfSprint = 6

const RepositoryErrorWorkspaceisNotFound = 11

const Error = (error) => {
  switch (error) {
    case RepositoryErrorIsNotInstanceOfWorkspace:
      return 'The parameter is not instance of Workspace class'
    case RepositoryErrorIsNotInstanceOfWorkspaceMember:
      return 'The paramater is not instance of Workspace Member class'
    case RepositoryErrorIsNotInstanceOfBoard:
      return 'The parameter is not instance of Board class'
    case RepositoryErrorIsNotInstanceOfIssue:
      return 'The parameter is not instance of Issue class'
    case RepositoryErrorIsNotInstanceOfProject:
      return 'The parameter is not instance of Project class'
    case RepositoryErrorIsNotInstanceOfSprint:
      return 'The parameter is not instance of Sprint class'
    case RepositoryErrorWorkspaceisNotFound:
      return 'Workspace is not found in repository'
    default:
      return 'Unrecognized repository error'
  }
}

module.exports = {
  Error,
  RepositoryErrorIsNotInstanceOfWorkspace,
  RepositoryErrorIsNotInstanceOfWorkspaceMember,
  RepositoryErrorIsNotInstanceOfBoard,
  RepositoryErrorIsNotInstanceOfIssue,
  RepositoryErrorIsNotInstanceOfProject,
  RepositoryErrorIsNotInstanceOfSprint
}
