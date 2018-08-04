const assert = require('assert')
const { expect } = require('chai')
const Team = require('./team')
const User = require('./../../user/domain/user')
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
      let user1 = User.createUser('Foobar User 1', 'awesome password')
      let user2 = User.createUser('Foobar User 2', 'awesome password')

      team.attachMember(user1)
      team.attachMember(user2)

      assert.deepEqual(team.member, [user1, user2])
    })

    it ('can not attach new member, if the member is already attached', () => {
      let team = Team.createTeam('Foobar', 'foobar-awesome')
      let user = User.createUser('Foobar User', 'some')

      expect(() => team.attachMember(user)).to.be.ok

      team.attachMember(user)
      expect(() => team.attachMember(user))
        .to.throw(Error(TeamErrorMemberIsRegistered))
    })
  })
})
