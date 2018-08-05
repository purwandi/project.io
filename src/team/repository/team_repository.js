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

  FindByUid (uid) {
    return this.teamMap.find(data => data.uid === uid)
  }

}

const NewTeamRepositoryInMemory = () => {
  return new TeamRepository()
}

module.exports = {
  TeamRepository,
  NewTeamRepositoryInMemory
}
