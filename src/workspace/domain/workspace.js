const {
  Error,
  WorkspaceErrorNameisNotEmpty,
  WorkspaceErrorSlugisNotEmpty,
  WorkspaceErrorSlugIsNotValid
} = require('./workspace_errors')
const uuid4 = require('uuid/v4')
const { slugIsValid } = require('./workspace_validate')
const { Model } = require('objectmodel')

const WorkspaceProperty = Model({
  UID: String,
  name: String,
  slug: String,
  created_at: Date
})

class Workspace extends WorkspaceProperty {

  static createWorkspace (name, slug) {
    if (!name) throw Error(WorkspaceErrorNameisNotEmpty)
    if (!slug) throw Error(WorkspaceErrorSlugisNotEmpty)

    if (!slugIsValid(slug)) {
      throw Error(WorkspaceErrorSlugIsNotValid)
    }

    return new Workspace({
      UID: uuid4(),
      name: name,
      slug: slug,
      created_at: new Date()
    })
  }

  changeName (name) {
    this.name = name
  }

}

module.exports = Workspace
