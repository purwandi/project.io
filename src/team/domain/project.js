const { Model } = require('objectmodel')
const {
  Error,
  ProjectErrorTeamisNotInstanceofTeam,
  ProjectErrorNameisNotEmpty,
  ProjectErrorSlugisNotEmpty,
  ProjectErrorVisibilityisNotEmpty,
  ProjectErrorVisibilityInvalidType
} = require('./project_error')
const uuid = require('uuid')
const Team = require('./team')

const visibilityLevel = ['private', 'public']
const ProjectProperty = Model({
  UID: String,
  name: String,
  slug: String,
  visibility: visibilityLevel,
  team: Team,
  created_at: Date
})

class Project extends ProjectProperty {

  static createProject (team, name, slug, visibility) {
    if (team instanceof Team === false) {
      throw Error(ProjectErrorTeamisNotInstanceofTeam)
    }

    if (!name) throw Error(ProjectErrorNameisNotEmpty)
    if (!slug) throw Error(ProjectErrorSlugisNotEmpty)
    if (!visibility) throw Error(ProjectErrorVisibilityisNotEmpty)

    if (!visibilityLevel.includes(visibility)) {
      throw Error(ProjectErrorVisibilityInvalidType)
    }

    return new Project({
      UID: uuid.v4(),
      name: name,
      slug: slug,
      visibility: visibility,
      team: team,
      created_at: new Date()
    })
  }
}

module.exports = Project
