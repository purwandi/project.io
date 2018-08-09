'use strict'

const Team = require('./../domain/team')
const { Error, RepositoryErrorIsNotInstanceOfTeam } = require('./repository_error')

class TeamRepositoryInMemory {

  constructor (teams = []) {
    this.teamMap = teams
  }

  static init (teamMap) {
    return new TeamRepositoryInMemory(teamMap)
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

module.exports = TeamRepositoryInMemory
