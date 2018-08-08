const assert = require('assert')
const { expect } = require('chai')
const Team = require('./team')
const {
  Error,
  TeamErrorNameisNotEmpty,
  TeamErrorSlugisNotEmpty,
  TeamErrorSlugIsNotValid
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

  })
})
