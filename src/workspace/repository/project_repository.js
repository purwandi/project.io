'use strict'

const { Error, RepositoryErrorIsNotInstanceOfProject } = require('./repository_error')
const Project = require('./../domain/project')

class ProjectRepositoryInMemory {

  constructor (projectMap) {
    this.projectMap = projectMap || []
  }

  static init (projectMap) {
    return new ProjectRepositoryInMemory(projectMap)
  }

  Save (project) {
    if (project instanceof Project === false) {
      throw Error(RepositoryErrorIsNotInstanceOfProject)
    }

    let index = this.FindIndex(project)

    if (index > -1) {
      this.projectMap[index] = project
    } else {
      this.projectMap.push(project)
    }
  }

  FindAll () {
    return this.projectMap
  }

  FindIndex (project) {
    return this.projectMap.findIndex(item => item.UID === project.UID)
  }

  FindByWorkspaceID (workspaceUID) {
    return this.projectMap.filter(data => data.workspace_uid === workspaceUID)
  }

  FindByID (projectUID) {
    return this.projectMap.find(data => data.UID === projectUID)
  }

}

module.exports = ProjectRepositoryInMemory
