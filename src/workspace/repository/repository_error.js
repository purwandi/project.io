const RepositoryErrorIsNotInstanceOfWorkspace = 1
const RepositoryErrorIsNotInstanceOfWorkspaceMember = 2
const RepositoryErrorIsNotInstanceOfBoard = 3
const RepositoryErrorIsNotInstanceOfIssue = 4
const RepositoryErrorIsNotInstanceOfProject = 5
const RepositoryErrorIsNotInstanceOfSprint = 6
const RepositoryErrorIsNotInstanceOfLabel = 7

const RepositoryErrorWorkspaceisNotFound = 11
const RepositoryErrorProjectisNotFound = 12
const RepositoryErrorLabelisNotFound = 13
const RepositoryErrorIssueisNotFound = 14
const RepsitoryErrorSprintisNotFound = 15


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
    case RepositoryErrorIsNotInstanceOfLabel:
      return 'The parameter is not instance of Label class'
    case RepositoryErrorWorkspaceisNotFound:
      return 'Workspace is not found in repository'
    case RepositoryErrorProjectisNotFound:
      return 'Project is not found in repository'
    case RepositoryErrorLabelisNotFound:
      return 'Label is not found in repository'
    case RepositoryErrorIssueisNotFound:
      return 'Issue is not found in repository'
    case RepsitoryErrorSprintisNotFound:
      return 'Sprint is not found in repository'
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
  RepositoryErrorIsNotInstanceOfSprint,
  RepositoryErrorIsNotInstanceOfLabel,

  RepositoryErrorWorkspaceisNotFound,
  RepositoryErrorLabelisNotFound,
  RepositoryErrorProjectisNotFound,
  RepositoryErrorIssueisNotFound,
  RepsitoryErrorSprintisNotFound
}
