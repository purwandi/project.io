'use strict'

const { Error, RepositoryErrorIsNotInstanceOfIssue, RepositoryErrorIssueisNotFound } = require('./repository_error')
const Issue = require('./../domain/issue')

class IssueRepositoryInMemory {

  constructor (issueMap) {
    this.issueMap = issueMap || []
  }

  static init (issueMap) {
    return new IssueRepositoryInMemory(issueMap)
  }

  Save (issue) {
    if (issue instanceof Issue === false) {
      throw Error(RepositoryErrorIsNotInstanceOfIssue)
    }

    let index = this.FindIndex(issue)

    if (index > -1) {
      this.issueMap[index] = issue
    } else {
      this.issueMap.push(issue)
    }
  }

  FindAll () {
    return this.issueMap
  }

  FindIndex (project) {
    return this.issueMap.findIndex(item => item.UID === project.UID)
  }

  FindAllByCreatedBy (userUId) {
    return this.issueMap.filter(data => data.created_by === userUId)
  }

  FindAllByProjectUID (projectUID) {
    return this.issueMap.filter(data => data.project_uid === projectUID)
  }

  FindByUID (issueUID) {
    return this.issueMap.find(data => data.UID === issueUID)
  }

  Remove (project) {
    let index = this.FindIndex(project)

    if (index > -1) {
      this.issueMap.splice(index, 1)
      return true
    }
    throw Error(RepositoryErrorIssueisNotFound)
  }
}

module.exports = IssueRepositoryInMemory
