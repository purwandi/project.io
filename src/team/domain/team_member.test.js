const { expect } = require('chai')
const Team = require('./team')
const TeamMember = require('./team_member')
const { Error, TeamMemberErrorAlreadyHasThisRole } = require('./team_member_errors')

describe('Team member domain test', () => {
  describe('Team member unit testing suite', () => {
    it ('can create team member', () => {
      let team = Team.createTeam('Foobar', 'foobar')
      let member = TeamMember.createTeamMember('12323-123123-12321', team.UID, 'admin')

      expect(member).to.include({
        userUID: '12323-123123-12321',
        teamUID: team.UID,
        role: 'admin'
      })
    })

    it ('can change member role', () => {
      let team = Team.createTeam('Foobar', 'foobar')
      let member = TeamMember.createTeamMember('12323-123123-12321', team.UID, 'admin')
      member.changeRole('member')
      expect(member)
        .to.be.include({
          userUID: '12323-123123-12321',
          teamUID: team.UID,
          role: 'member'
        })
    })

    it ('change member role will throw an error if the role is same with current role', () => {
      let team = Team.createTeam('Foobar', 'foobar')
      let member = TeamMember.createTeamMember('12323-123123-12321', team.UID, 'admin')

      expect(() => member.changeRole('admin'))
        .to.throw(Error(TeamMemberErrorAlreadyHasThisRole))
    })
  })
})
