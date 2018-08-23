'use strict'

const {
  Error,
  RepositoryErrorIsNotInstanceOfProject,
  RepositoryErrorProjectisNotFound
} = require('./repository_error')
const { Project } = require('./../domain')

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

  FindByWorkspaceUID (workspaceUID) {
    return this.projectMap.filter(data => data.workspace_uid === workspaceUID)
  }

  FindByUID (projectUID) {
    let project = this.projectMap.find(data => data.UID === projectUID)

    if (!project) throw Error(RepositoryErrorProjectisNotFound)

    return project
  }

  Remove (project) {
    let index = this.FindIndex(project)

    if (index > -1) {
      this.projectMap.splice(index, 1)
      return true
    }
    throw Error(RepositoryErrorProjectisNotFound)
  }

}

module.exports = ProjectRepositoryInMemory
