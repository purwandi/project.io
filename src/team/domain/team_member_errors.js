const TeamMemberErrorAlreadyHasThisRole = 1

const Error = (error) => {
  switch (error) {
    case TeamMemberErrorAlreadyHasThisRole:
      return 'The member already have this role'

    default:
      return 'Unrecognized team member error code'
  }
}

module.exports = {
  Error,
  TeamMemberErrorAlreadyHasThisRole
}
