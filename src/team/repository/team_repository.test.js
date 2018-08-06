const { NewTeamRepositoryInMemory } = require('./team_repository')
const chai = require('chai')
const Team = require('./../domain/team')

describe('Team Repository Test Suite', () => {
  it ('can save new team data into repository', () => {
    let repo = NewTeamRepositoryInMemory()
    let team1 = Team.createTeam('Foobar 1', 'foobar-1')
    let team2 = Team.createTeam('Foobar 2', 'foobar-2')

    repo.Save(team1)
    repo.Save(team2)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([team1, team2])
  })

  it ('can find team by id', () => {
    let repo = NewTeamRepositoryInMemory()
    let team1 = Team.createTeam('Foobar 1', 'foobar-1')
    let team2 = Team.createTeam('Foobar 2', 'foobar-2')
    let team3 = Team.createTeam('Foobar 3', 'foobar-3')

    repo.Save(team1)
    repo.Save(team2)
    repo.Save(team3)

    let data = repo.FindById(team2.UID)

    chai.expect(data)
      .to.be.eql(team2)
  })
})
