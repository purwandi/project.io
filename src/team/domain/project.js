const { Model } = require('objectmodel')
const {
  Error,
  ProjectErrorTeamisNotEmpty,
  ProjectErrorNameisNotEmpty,
  ProjectErrorSlugisNotEmpty,
  ProjectErrorVisibilityisNotEmpty,
  ProjectErrorVisibilityInvalidType
} = require('./project_error')
const uuid = require('uuid')

const visibilityLevel = ['private', 'public']
const ProjectProperty = Model({
  UID: String,
  name: String,
  slug: String,
  visibility: visibilityLevel,
  team_uid: String,
  created_at: Date,
  update_at: [Date]
})

class Project extends ProjectProperty {

  static createProject (teamUID, name, slug, visibility) {
    if (!teamUID) throw Error(ProjectErrorTeamisNotEmpty)
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
      team_uid: teamUID,
      created_at: new Date()
    })
  }

  changeVisibility (visibility) {
    if (!visibilityLevel.includes(visibility)) {
      throw Error(ProjectErrorVisibilityInvalidType)
    }

    this.visibility = visibility
    this.update_at = new Date()
  }

}

module.exports = Project
