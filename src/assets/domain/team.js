const {
  Error,
  TeamErrorNameisNotEmpty,
  TeamErrorSlugisNotEmpty,
  TeamErrorSlugIsNotValid,
  TeamErrorMemberIsRegistered
} = require('./team_errors')
const uuid4 = require('uuid/v4')
const { slugIsValid } = require('./team_validate')
const { Model } = require('objectmodel')

const TeamProperty = {
  uid: String,
  name: String,
  slug: String,
  member: [Array]
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

    return new Team({ uid: uuid4(), name, slug, member: [] })
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
    return this.member.find(data => data.uid === member.uid)
  }
}

module.exports = Team
