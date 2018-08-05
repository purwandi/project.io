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

const TeamProperty = {
  UID: String,
  name: String,
  slug: String,
  member: [ArrayModel(TeamMember)]
}

class Team extends Model(TeamProperty)  {

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

    return new Team({ UID: uuid4(), name, slug })
  }

  attachMember (userUID, role) {
    if (this.isMemberRegistered(userUID)) {
      throw Error(TeamErrorMemberIsRegistered)
    } else {
      this.member.push(
        TeamMember.createTeamMember(userUID, role)
      )
    }
  }

  changeMemberRole (userUID, role) {
    this.member.forEach((item, index) => {
      if (item.userUID === userUID) {
        item.changeRole(role)
        this.member[index] = item
      }
    })
  }

  isMemberRegistered (userUID) {
    if (Array.isArray(this.member)) {
      return this.member.find(data => data.userUID === userUID) ? true : false
    }
    this.member = []
    return false
  }
}

module.exports = Team
