const TeamMemberErrorTeamUIDisNotEmpty = 1
const TeamMemberErrorUserUIDisNotEmpty = 2
const TeamMemberErrorInvalidRoleType = 3
const TeamMemberErrorAlreadyHasThisRole = 4

const Error = (error) => {
  switch (error) {
    case TeamMemberErrorTeamUIDisNotEmpty:
      return 'The member UID is not empty'
    case TeamMemberErrorUserUIDisNotEmpty:
      return 'The user UID is not empty'
    case TeamMemberErrorInvalidRoleType:
      return 'Role should be admin or member'
    case TeamMemberErrorAlreadyHasThisRole:
      return 'The member already have this role'
    default:
      return 'Unrecognized team member error code'
  }
}

module.exports = {
  Error,
  TeamMemberErrorTeamUIDisNotEmpty,
  TeamMemberErrorUserUIDisNotEmpty,
  TeamMemberErrorInvalidRoleType,
  TeamMemberErrorAlreadyHasThisRole
}
