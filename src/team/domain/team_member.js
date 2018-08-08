const { Model } = require('objectmodel')
const { Error, TeamMemberErrorAlreadyHasThisRole } = require('./team_member_errors')

const TeamMemberProperty = {
  userUID: String,
  teamUID: String,
  role: ['admin', 'member']
}

class TeamMember extends Model(TeamMemberProperty) {

  static createTeamMember (userUID, teamUID, role) {
    return new TeamMember({ userUID, teamUID, role })
  }

  changeRole (role) {
    if (this.role === role) {
      throw Error(TeamMemberErrorAlreadyHasThisRole)
    }

    this.role = role
  }

}

module.exports = TeamMember
