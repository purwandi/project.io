'use strict'

const Sprint = require('./../domain/sprint')
const { Error, RepositoryErrorIsNotInstanceOfSprint } = require('./repository_error')

class SprintRepositoryInMemory {

  constructor (sprintMap) {
    this.sprintMap = sprintMap || []
  }

  static init (sprintMap) {
    return new SprintRepositoryInMemory(sprintMap)
  }

  Save (sprint) {
    if (sprint instanceof Sprint === false) throw Error(RepositoryErrorIsNotInstanceOfSprint)

    let index = this.FindIndex(sprint)

    if (index > -1) {
      this.sprintMap[index] = sprint
    } else {
      this.sprintMap.push(sprint)
    }
  }

  FindIndex (sprint) {
    return this.sprintMap.findIndex(item => item.UID === sprint.UID)
  }

  FindAll () {
    return this.sprintMap
  }

  FindAllByProjectUID (projectUID) {
    return this.sprintMap.filter(item => item.project_uid === projectUID)
  }

}

module.exports = SprintRepositoryInMemory
