const WorkspaceMemberErrorWorkspaceUIDisNotEmpty = 1
const WorkspaceMemberErrorUserUIDisNotEmpty = 2
const WorkspaceMemberErrorInvalidRoleType = 3
const WorkspaceMemberErrorAlreadyHasThisRole = 4

const Error = (error) => {
  switch (error) {
    case WorkspaceMemberErrorWorkspaceUIDisNotEmpty:
      return 'The member UID is not empty'
    case WorkspaceMemberErrorUserUIDisNotEmpty:
      return 'The user UID is not empty'
    case WorkspaceMemberErrorInvalidRoleType:
      return 'Role should be admin or member'
    case WorkspaceMemberErrorAlreadyHasThisRole:
      return 'The member already have this role'
    default:
      return 'Unrecognized team member error code'
  }
}

module.exports = {
  Error,
  WorkspaceMemberErrorWorkspaceUIDisNotEmpty,
  WorkspaceMemberErrorUserUIDisNotEmpty,
  WorkspaceMemberErrorInvalidRoleType,
  WorkspaceMemberErrorAlreadyHasThisRole
}
