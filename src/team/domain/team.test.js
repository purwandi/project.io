const assert = require('assert')
const { expect } = require('chai')
const Team = require('./team')
const TeamMember = require('./team_member')
const {
  Error,
  TeamErrorNameisNotEmpty,
  TeamErrorSlugisNotEmpty,
  TeamErrorSlugIsNotValid,
  TeamErrorMemberIsRegistered
} = require('./team_errors')

describe('Team domain test', () => {
  describe('Team unit test suite', () => {
    it('should throw error if name is blank', () => {
      expect(() => Team.createTeam(''))
        .to.throw(Error(TeamErrorNameisNotEmpty))
    })

    it ('should throw error if slug is blank', () => {
      expect(() => Team.createTeam('Foobar'))
        .to.throw(Error(TeamErrorSlugisNotEmpty))
    })

    it ('should throw error, if slug is not valid format', () => {
      expect(() => Team.createTeam('Foobar', 'Foobar Awesome'))
        .to.throw(Error(TeamErrorSlugIsNotValid))

      expect(() => Team.createTeam('Foobar', 'Foobar-Awesome'))
        .to.throw(Error(TeamErrorSlugIsNotValid))

      expect(() => Team.createTeam('Foobar', 'Foobar-'))
        .to.throw(Error(TeamErrorSlugIsNotValid))
    })

    it ('should create new team', () => {
      let team = Team.createTeam('Foobar', 'foobar-awesome')
      assert.equal(true, team instanceof Team)
      assert.equal('Foobar', team.name)
      assert.equal('foobar-awesome', team.slug)
    })

    it ('can attach member in a team', () => {
      let team = Team.createTeam('Foobar', 'foobar-awesome')

      team.attachMember('uid-232431', 'admin')
      team.attachMember('uid-232432', 'member')

      expect(team.member)
        .to.eql([
          { userUID: 'uid-232431', role: 'admin'},
          { userUID: 'uid-232432', role: 'member'}
        ])
    })

    it ('can check existing member in a current team', () => {
      let team = Team.createTeam('Foobar', 'foobar-awesome')
      team.member = [
        TeamMember.createTeamMember('12312-23432431', 'admin'),
        TeamMember.createTeamMember('12312-23432432', 'member')
      ]

      expect(team.isMemberRegistered('12312-23432431'))
        .to.be.true

      expect(team.isMemberRegistered('12312-23432433'))
        .to.be.false
    })

    it ('can not attach new member, if the member is already attached', () => {
      let team = Team.createTeam('Foobar', 'foobar-awesome')

      expect(() => team.attachMember('uid-232431', 'admin')).to.be.ok

      team.attachMember('uid-232431', 'admin')
      expect(() => team.attachMember('uid-232431', 'admin'))
        .to.throw(Error(TeamErrorMemberIsRegistered))
    })

    it ('can change member role', () => {
      let team = Team.createTeam('Foobar', 'foobar-awesome')
      team.attachMember('uid-232431', 'admin')
      team.attachMember('uid-232432', 'admin')
      expect(() => team.changeMemberRole('uid-232431', 'member'))
        .to.be.ok

      team.changeMemberRole('uid-232431', 'member')
      team.changeMemberRole('uid-232432', 'member')

      expect(team.member)
        .to.eql([
          { userUID: 'uid-232431', role: 'member' },
          { userUID: 'uid-232432', role: 'member' }
        ])
    })
  })
})
