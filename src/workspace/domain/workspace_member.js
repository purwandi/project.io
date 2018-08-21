const { Model } = require('objectmodel')
const {
  Error,
  WorkspaceMemberErrorWorkspaceUIDisNotEmpty,
  WorkspaceMemberErrorUserUIDisNotEmpty,
  WorkspaceMemberErrorInvalidRoleType,
  WorkspaceMemberErrorAlreadyHasThisRole
} = require('./workspace_member_errors')

const RoleType = ['admin', 'member']
const WorkspaceMemberProperty = {
  user_uid: String,
  workspace_uid: String,
  role: RoleType,
  created_at: Date
}

class WorkspaceMember extends Model(WorkspaceMemberProperty) {

  static createWorkspaceMember (userUID, workspaceUID, role) {
    if (!userUID) throw Error(WorkspaceMemberErrorUserUIDisNotEmpty)
    if (!workspaceUID) throw Error(WorkspaceMemberErrorWorkspaceUIDisNotEmpty)
    if (!RoleType.includes(role)) throw Error(WorkspaceMemberErrorInvalidRoleType)

    return new WorkspaceMember({
      user_uid: userUID,
      workspace_uid: workspaceUID,
      role,
      created_at: new Date()
    })
  }

  changeRole (role) {
    if (this.role === role) throw Error(WorkspaceMemberErrorAlreadyHasThisRole)

    this.role = role
  }

}

module.exports = WorkspaceMember
