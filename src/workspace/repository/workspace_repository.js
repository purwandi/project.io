'use strict'

const { Workspace } = require('./../domain')
const { Error, RepositoryErrorIsNotInstanceOfWorkspace, RepositoryErrorWorkspaceisNotFound } = require('./repository_error')

class WorkspaceRepositoryInMemory {

  constructor (workspaces = []) {
    this.workspaceMap = workspaces
  }

  static init (workspaceMap) {
    return new WorkspaceRepositoryInMemory(workspaceMap)
  }

  Save (workspace) {
    if (workspace instanceof Workspace === false) {
      throw Error(RepositoryErrorIsNotInstanceOfWorkspace)
    }

    let index = this.FindIndex(workspace)

    if (index > -1) {
      this.workspaceMap[index] = workspace
    } else {
      this.workspaceMap.push(workspace)
    }
  }

  FindIndex (workspace) {
    return this.workspaceMap.findIndex(item => item.UID === workspace.UID)
  }

  FindAll () {
    return this.workspaceMap
  }

  FindByUID (uid) {
    let workspace = this.workspaceMap.find(data => data.UID === uid)

    if (!workspace) throw Error(RepositoryErrorWorkspaceisNotFound)

    return workspace
  }

  Remove (workspace) {
    let index = this.FindIndex(workspace)

    if (index > -1) {
      this.workspaceMap.splice(index, 1)
      return true
    }
    throw Error(RepositoryErrorWorkspaceisNotFound)
  }

}

module.exports = WorkspaceRepositoryInMemory
