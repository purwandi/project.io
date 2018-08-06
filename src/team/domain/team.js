const {
  Error,
  TeamErrorNameisNotEmpty,
  TeamErrorSlugisNotEmpty,
  TeamErrorSlugIsNotValid,
  TeamErrorMemberIsRegistered
} = require('./team_errors')
const uuid4 = require('uuid/v4')
const { slugIsValid } = require('./team_validate')
const { Model, ArrayModel } = require('objectmodel')
const TeamMember = require('./team_member')
const Board = require('./board')

const TeamProperty = Model({
  UID: String,
  name: String,
  slug: String,
  members: [ArrayModel(TeamMember)],
  boards: [ArrayModel(Board)]
})

class Team extends TeamProperty  {

  static createTeam (name, slug) {
    if (!name) {
      throw Error(TeamErrorNameisNotEmpty)
    }

    if (!slug) {
      throw Error(TeamErrorSlugisNotEmpty)
    }

    if (!slugIsValid(slug)) {
      throw Error(TeamErrorSlugIsNotValid)
    }

    return new Team({ UID: uuid4(), name, slug, members: [], boards: [] })
  }

  attachMember (userUID, role) {
    if (this.isMemberRegistered(userUID)) {
      throw Error(TeamErrorMemberIsRegistered)
    } else {
      this.members.push(
        TeamMember.createTeamMember(userUID, role)
      )
    }
  }

  changeMemberRole (userUID, role) {
    this.members.forEach((item, index) => {
      if (item.userUID === userUID) {
        item.changeRole(role)
        this.members[index] = item
      }
    })
  }

  isMemberRegistered (userUID) {
    if (Array.isArray(this.members)) {
      return this.members.find(data => data.userUID === userUID) ? true : false
    }
    this.members = []
    return false
  }

  addBoard (board) {
    this.boards.push(board)
  }

}

module.exports = Team
