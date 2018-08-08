const { expect } = require('chai')
const Team = require('./team')
const TeamMember = require('./team_member')
const {
  Error,
  TeamMemberErrorTeamUIDisNotEmpty,
  TeamMemberErrorUserUIDisNotEmpty,
  TeamMemberErrorInvalidRoleType,
  TeamMemberErrorAlreadyHasThisRole
} = require('./team_member_errors')

describe('Team member domain test', () => {
  describe('Team member unit testing suite', () => {

    it('should throw error if the userUID is empty', () => {
      expect(() => TeamMember.createTeamMember())
        .to.throw(Error(TeamMemberErrorUserUIDisNotEmpty))
    })

    it('should throw error if the memberUID is empty', () => {
      expect(() => TeamMember.createTeamMember('asdasd-qweqweqw'))
        .to.throw(Error(TeamMemberErrorTeamUIDisNotEmpty))
    })

    it('should throw error if the role is not valid', () => {
      expect(() => TeamMember.createTeamMember('asdasd-qweqweqw', '23423423423-23423', 'ada'))
        .to.throw(Error(TeamMemberErrorInvalidRoleType))
    })

    it('can create team member', () => {
      let team = Team.createTeam('Foobar', 'foobar')
      let member = TeamMember.createTeamMember('12323-123123-12321', team.UID, 'admin')

      expect(member).to.include({
        userUID: '12323-123123-12321',
        teamUID: team.UID,
        role: 'admin'
      })
    })

    it('can change member role', () => {
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

    it('change member role will throw an error if the role is same with current role', () => {
      let team = Team.createTeam('Foobar', 'foobar')
      let member = TeamMember.createTeamMember('12323-123123-12321', team.UID, 'admin')

      expect(() => member.changeRole('admin'))
        .to.throw(Error(TeamMemberErrorAlreadyHasThisRole))
    })
  })
})
