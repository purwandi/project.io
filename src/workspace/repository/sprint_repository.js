'use strict'

const Sprint = require('./../domain/sprint')
const { Error, RepositoryErrorIsNotInstanceOfSprint, RepsitoryErrorSprintisNotFound } = require('./repository_error')

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

  FindByUID (sprintUID) {
    let sprint = this.sprintMap.find(item => item.UID === sprintUID)

    if (!sprint) throw Error(RepsitoryErrorSprintisNotFound)

    return sprint
  }

  FindAll () {
    return this.sprintMap
  }

  FindAllByProjectUID (projectUID) {
    return this.sprintMap.filter(item => item.project_uid === projectUID)
  }

  Remove (sprint) {
    let index = this.FindIndex(sprint)

    if (index > -1) {
      this.sprintMap.splice(index, 1)
      return true
    }
    throw Error(RepsitoryErrorSprintisNotFound)
  }

}

module.exports = SprintRepositoryInMemory
