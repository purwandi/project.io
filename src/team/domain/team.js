const {
  Error,
  TeamErrorNameisNotEmpty,
  TeamErrorSlugisNotEmpty,
  TeamErrorSlugIsNotValid
} = require('./team_errors')
const uuid4 = require('uuid/v4')
const { slugIsValid } = require('./team_validate')
const { Model } = require('objectmodel')

const TeamProperty = Model({
  UID: String,
  name: String,
  slug: String,
  created_at: Date
})

class Team extends TeamProperty {

  static createTeam (name, slug) {
    if (!name) throw Error(TeamErrorNameisNotEmpty)
    if (!slug) throw Error(TeamErrorSlugisNotEmpty)

    if (!slugIsValid(slug)) {
      throw Error(TeamErrorSlugIsNotValid)
    }

    return new Team({
      UID: uuid4(),
      name: name,
      slug: slug,
      created_at: new Date()
    })
  }

}

module.exports = Team
