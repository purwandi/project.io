'use strict'

const {
  Error,
  RepositoryErrorIsNotInstanceOfLabel,
  RepositoryErrorLabelisNotFound
} = require('./repository_error')
const { Label } = require('./../domain')

class LabelRepositoryInMemory {

  constructor (labelMap) {
    this.labelMap = labelMap || []
  }

  static init (labelMap) {
    return new LabelRepositoryInMemory(labelMap)
  }

  Save (label) {
    if (label instanceof Label === false) {
      throw Error(RepositoryErrorIsNotInstanceOfLabel)
    }

    let index = this.FindIndex(label)

    if (index > -1) {
      this.labelMap[index] = label
    } else {
      this.labelMap.push(label)
    }
  }

  FindAll () {
    return this.labelMap
  }

  FindIndex (label) {
    return this.labelMap.findIndex(item => item.UID === label.UID)
  }

  FindByWorkspaceUID (workspaceUID) {
    return this.labelMap.filter(data => data.workspace_uid === workspaceUID)
  }

  FindByUID (projectUID) {
    let label = this.labelMap.find(data => data.UID === projectUID)

    if (!label) throw Error(RepositoryErrorLabelisNotFound)

    return label
  }

  Remove (label) {
    let index = this.FindIndex(label)

    if (index > -1) {
      this.labelMap.splice(index, 1)
      return true
    }
    throw Error(RepositoryErrorLabelisNotFound)
  }

}

module.exports = LabelRepositoryInMemory
