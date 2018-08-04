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
const User = require('./../../user/domain/user')

const TeamProperty = {
  UID: String,
  name: String,
  slug: String,
  member: [ArrayModel(User)]
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

  attachMember (member) {
    // @TODO need to validate the member is instance of user class
    if (this.isMemberRegistered(member)) {
      throw Error(TeamErrorMemberIsRegistered)
    } else {
      this.member.push(member)
    }
  }

  isMemberRegistered (member) {
    if (Array.isArray(this.member)) {
      return this.member.find(data => data.UID === member.UID)
    }
    this.member = []
    return false
  }
}

module.exports = Team
