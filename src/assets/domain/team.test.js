const assert = require('assert')
const expect = require('chai').expect
const Team = require('./team')
const {
  Error,
  TeamErrorNameisNotEmpty,
  TeamErrorSlugisNotEmpty,
  TeamErrorSlugIsNotValid,
  TeamErrorMemberIsRegistered
} = require('./team_errors')

describe('Team domain test', () => {
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
    let user1 = { uid: 'hash-id-1', name: 'Foobar User 1' }
    let user2 = { uid: 'hash-id-2', name: 'Foobar User 2' }

    team.attachMember(user1)
    team.attachMember(user2)

    assert.deepEqual(team.member, [
      { name: 'Foobar User 1', uid: 'hash-id-1' },
      { name: 'Foobar User 2', uid: 'hash-id-2' },
    ])

  })

  it ('can not attach new member, if the member is already attached', () => {
    let team = Team.createTeam('Foobar', 'foobar-awesome')
    let user = { uid: 'hash-id', name: 'Foobar User' }

    expect(() => team.attachMember(user)).to.be.ok

    team.attachMember(user)
    expect(() => team.attachMember(user))
      .to.throw(Error(TeamErrorMemberIsRegistered))
  })
})
