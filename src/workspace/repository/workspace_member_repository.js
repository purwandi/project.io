'use strict'

const WorkspaceMember = require('./../domain/workspace_member')
const {
  Error,
  RepositoryErrorIsNotInstanceOfWorkspaceMember,
  RepositoryErrorWorkspaceMemberisNotFound
} = require('./repository_error')

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

  FindAllByWorkspaceUID (workspaceUID) {
    return this.workspaceMemberMap.filter(data => data.workspace_uid === workspaceUID)
  }

  FindIndexByUserUIDWithWorkspaceUID (userUID, workspaceUID) {
    return this.workspaceMemberMap.find(item => {
      return item.user_uid === userUID && item.workspace_uid === workspaceUID
    })
  }

  Remove (workspaceMember) {
    let index = this.FindIndex(workspaceMember)

    if (index > -1) {
      this.workspaceMemberMap.splice(index, 1)
      return true
    }
    throw Error(RepositoryErrorWorkspaceMemberisNotFound)
  }

}

module.exports = WorkspaceMemberRepositoryInMemory
