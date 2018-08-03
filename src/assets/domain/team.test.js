const assert = require('assert')
const { Team, createTeam } = require('./team')
const { Error, TeamErrorNameisNotEmpty, TeamErrorSlugisNotEmpty, TeamErrorSlugIsNotValid } = require('./team_errors')

describe('Team domain test', () => {
  it('should throw error if name is blank', () => {
    let error = createTeam('')
    assert.equal(error, Error(TeamErrorNameisNotEmpty))
  })

  it ('should throw error if slug is blank', () => {
    let error = createTeam('Foobar')
    assert.equal(error, Error(TeamErrorSlugisNotEmpty))
  })

  it ('should thow error, if slug is not valid format', () => {
    let error = createTeam('Foobar', 'Foobar Awesome')
    assert.equal(error, Error(TeamErrorSlugIsNotValid))
  })

  it ('should create new team', () => {
    let team = createTeam('Foobar', 'foobar')
    assert.equal(true, team instanceof Team)
    assert.equal('Foobar', team.name)
    assert.equal('foobar', team.slug)
  })
})
