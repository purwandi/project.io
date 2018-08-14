const { Model } = require('objectmodel')
const {
  Error,
  TeamMemberErrorTeamUIDisNotEmpty,
  TeamMemberErrorUserUIDisNotEmpty,
  TeamMemberErrorInvalidRoleType,
  TeamMemberErrorAlreadyHasThisRole
} = require('./team_member_errors')

const RoleType = ['admin', 'member']
const TeamMemberProperty = {
  user_uid: String,
  team_uid: String,
  role: RoleType,
  created_at: Date
}

class TeamMember extends Model(TeamMemberProperty) {

  static createTeamMember (userUID, teamUID, role) {
    if (!userUID) throw Error(TeamMemberErrorUserUIDisNotEmpty)
    if (!teamUID) throw Error(TeamMemberErrorTeamUIDisNotEmpty)

    if (!RoleType.includes(role)) {
      throw Error(TeamMemberErrorInvalidRoleType)
    }

    return new TeamMember({
      user_uid: userUID,
      team_uid: teamUID,
      role,
      created_at: new Date()
    })
  }

  changeRole (role) {
    if (this.role === role) {
      throw Error(TeamMemberErrorAlreadyHasThisRole)
    }

    this.role = role
  }

}

module.exports = TeamMember
