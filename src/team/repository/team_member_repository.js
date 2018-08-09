'use strict'

const TeamMember = require('./../domain/team_member')
const { Error, RepositoryErrorIsNotInstanceOfTeamMember } = require('./repository_error')

class TeamMemberRepositoryInMemory {

  constructor (teamMemberMap = []) {
    this.teamMemberMap = teamMemberMap
  }

  static init (issueMap) {
    return new TeamMemberRepositoryInMemory(issueMap)
  }

  Save (teamMember) {
    if (teamMember instanceof TeamMember === false) {
      throw Error(RepositoryErrorIsNotInstanceOfTeamMember)
    }

    let index = this.FindIndex(teamMember)

    if (index > -1) {
      this.teamMemberMap[index] = teamMember
    } else {
      this.teamMemberMap.push(teamMember)
    }
  }

  FindAll () {
    return this.teamMemberMap
  }

  FindAllByUserId (userUID) {
    return this.teamMemberMap.filter(data => data.userUID === userUID)
  }

  FindIndex (teamMember) {
    return this.teamMemberMap.findIndex(item => {
      return item.userUID === teamMember.userUID && item.teamUID === teamMember.teamUID
    })
  }

  FindAllByTeamID (teamUID) {
    return this.teamMemberMap.filter(data => data.teamUID === teamUID)
  }

}

module.exports = TeamMemberRepositoryInMemory
