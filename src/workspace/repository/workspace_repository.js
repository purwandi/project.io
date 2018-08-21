'use strict'

const Workspace = require('./../domain/workspace')
const { Error, RepositoryErrorIsNotInstanceOfWorkspace } = require('./repository_error')

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

    this.workspaceMap.push(workspace)
  }

  FindAll () {
    return this.workspaceMap
  }

  FindById (uid) {
    return this.workspaceMap.find(data => data.UID === uid)
  }

}

module.exports = WorkspaceRepositoryInMemory
