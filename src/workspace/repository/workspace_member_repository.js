'use strict'

const WorkspaceMember = require('./../domain/workspace_member')
const { Error, RepositoryErrorIsNotInstanceOfWorkspaceMember } = require('./repository_error')

class WorkspaceMemberRepositoryInMemory {

  constructor (workspaceMemberMap = []) {
    this.workspaceMemberMap = workspaceMemberMap
  }

  static init (issueMap) {
    return new WorkspaceMemberRepositoryInMemory(issueMap)
  }

  Save (workspaceMember) {
    if (workspaceMember instanceof WorkspaceMember === false) {
      throw Error(RepositoryErrorIsNotInstanceOfWorkspaceMember)
    }

    let index = this.FindIndex(workspaceMember)

    if (index > -1) {
      this.workspaceMemberMap[index] = workspaceMember
    } else {
      this.workspaceMemberMap.push(workspaceMember)
    }
  }

  FindAll () {
    return this.workspaceMemberMap
  }

  FindAllByUserId (userUID) {
    return this.workspaceMemberMap.filter(data => data.user_uid === userUID)
  }

  FindIndex (workspaceMember) {
    return this.workspaceMemberMap.findIndex(item => {
      return item.user_uid === workspaceMember.user_uid && item.workspace_uid === workspaceMember.workspace_uid
    })
  }

  FindAllByWorkspaceID (workspaceUID) {
    return this.workspaceMemberMap.filter(data => data.workspace_uid === workspaceUID)
  }

}

module.exports = WorkspaceMemberRepositoryInMemory
