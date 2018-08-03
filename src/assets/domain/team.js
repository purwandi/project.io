const {
  Error,
  TeamErrorNameisNotEmpty,
  TeamErrorSlugisNotEmpty,
  TeamErrorSlugIsNotValid
} = require('./team_errors')
const uuid4 = require('uuid/v4')
const Model = require('objectmodel')
const slugValidation = require('./../../helpers/validations/slug')

const Team = new Model.ObjectModel({
  uid: String,
  slug: String,
  name: String
})


const createTeam = (name, slug) => {
  if (!name) {
    return Error(TeamErrorNameisNotEmpty)
  }

  // need validate to team repositories
  if (!slug) {
    return Error(TeamErrorSlugisNotEmpty)
  }

  if (!slugValidation.exec(slug)) {
    return Error(TeamErrorSlugIsNotValid)
  }

  return new Team({
    uid: uuid4(),
    slug: slug,
    name: name
  })
}

module.exports = {
  Team,
  createTeam
}
