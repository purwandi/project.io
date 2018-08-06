const { expect } = require('chai')
const TeamMember = require('./team_member')
const { Error, TeamMemberErrorAlreadyHasThisRole } = require('./team_member_errors')

describe('Team member domain test', () => {
  describe('Team member unit testing suite', () => {
    it ('can create team member', () => {
      let team = TeamMember.createTeamMember('122312-12321', 'admin')

      expect(team).to.include({
        userUID: '122312-12321',
        role: 'admin'
      })
    })

    it ('can change member role', () => {
      let team = TeamMember.createTeamMember('122312-12321', 'admin')
      team.changeRole('member')
      expect(team)
        .to.be.include({
          userUID: '122312-12321',
          role: 'member'
        })
    })

    it ('change member role will throw an error if the role is same with current role', () => {
      let team = TeamMember.createTeamMember('122312-12321', 'admin')

      expect(() => team.changeRole('admin'))
        .to.throw(Error(TeamMemberErrorAlreadyHasThisRole))
    })
  })
})
