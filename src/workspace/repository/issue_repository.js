'use strict'

const { Error, RepositoryErrorIsNotInstanceOfIssue } = require('./repository_error')
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

    this.issueMap.push(issue)
  }

  FindAll () {
    return this.issueMap
  }

  FindAllByCreatedBy (userUId) {
    return this.issueMap.filter(data => data.created_by === userUId)
  }

  FindAllByProjectUID (projectUID) {
    return this.issueMap.filter(data => data.project_uid === projectUID)
  }

  FindByID (issueUID) {
    return this.issueMap.find(data => data.UID === issueUID)
  }

}

module.exports = IssueRepositoryInMemory
