const { Model } = require('objectmodel')
const {
  Error,
  ProjectErrorWorkspaceisNotEmpty,
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
  workspace_uid: String,
  created_at: Date,
  update_at: [Date]
})

class Project extends ProjectProperty {

  static createProject (workspaceUID, name, slug, visibility) {
    if (!workspaceUID) throw Error(ProjectErrorWorkspaceisNotEmpty)
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
      workspace_uid: workspaceUID,
      created_at: new Date()
    })
  }

  changeName (name) {
    this.name = name
    this.update_at = new Date()
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
