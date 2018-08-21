const WorkspaceErrorNameisNotEmpty = 1
const WorkspaceErrorSlugisNotEmpty = 2
const WorkspaceErrorSlugIsNotValid = 3

const Error = (error) => {
  switch (error) {
    case WorkspaceErrorNameisNotEmpty:
      return 'Workspace name cannot be empty'
    case WorkspaceErrorSlugisNotEmpty:
      return 'Workspace slug cannot be empty'
    case WorkspaceErrorSlugIsNotValid:
      return 'Workspace slug is not valid url friendly'
    default:
      return 'Unrecognized team error code'
  }
}

module.exports = {
  WorkspaceErrorNameisNotEmpty,
  WorkspaceErrorSlugisNotEmpty,
  WorkspaceErrorSlugIsNotValid,
  Error
}
