'use strict'

class TeamRepository {

  constructor (teams = []) {
    this.teamMap = teams
  }

  Save (team) {
    // @TODO check is instance of team
    return this.teamMap.push(team)
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
