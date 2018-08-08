'use strict'

const Team = require('./../domain/team')
const { Error, RepositoryErrorIsNotInstanceOfTeam } = require('./repository_error')

class TeamRepository {

  constructor (teams = []) {
    this.teamMap = teams
  }

  Save (team) {
    if (team instanceof Team === false) {
      throw Error(RepositoryErrorIsNotInstanceOfTeam)
    }

    this.teamMap.push(team)
  }

  FindAll () {
    return this.teamMap
  }

  FindById (uid) {
    return this.teamMap.find(data => data.UID === uid)
  }

}

const NewTeamRepositoryInMemory = () => {
  return new TeamRepository()
}

module.exports = {
  NewTeamRepositoryInMemory
}
