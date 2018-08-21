const { expect } = require('chai')
const Workspace = require('./workspace')
const WorkspaceMember = require('./workspace_member')
const {
  Error,
  WorkspaceMemberErrorWorkspaceUIDisNotEmpty,
  WorkspaceMemberErrorUserUIDisNotEmpty,
  WorkspaceMemberErrorInvalidRoleType,
  WorkspaceMemberErrorAlreadyHasThisRole
} = require('./workspace_member_errors')

describe('Workspace member domain test', () => {
  describe('Workspace member unit testing suite', () => {

    it('should throw error if the user_uid is empty', () => {
      expect(() => WorkspaceMember.createWorkspaceMember())
        .to.throw(Error(WorkspaceMemberErrorUserUIDisNotEmpty))
    })

    it('should throw error if the memberUID is empty', () => {
      expect(() => WorkspaceMember.createWorkspaceMember('asdasd-qweqweqw'))
        .to.throw(Error(WorkspaceMemberErrorWorkspaceUIDisNotEmpty))
    })

    it('should throw error if the role is not valid', () => {
      expect(() => WorkspaceMember.createWorkspaceMember('asdasd-qweqweqw', '23423423423-23423', 'ada'))
        .to.throw(Error(WorkspaceMemberErrorInvalidRoleType))
    })

    it('can create workspace member', () => {
      let workspace = Workspace.createWorkspace('Foobar', 'foobar')
      let member = WorkspaceMember.createWorkspaceMember('12323-123123-12321', workspace.UID, 'admin')

      expect(member).to.include({
        user_uid: '12323-123123-12321',
        workspace_uid: workspace.UID,
        role: 'admin'
      })
    })

    it('can change member role', () => {
      let workspace = Workspace.createWorkspace('Foobar', 'foobar')
      let member = WorkspaceMember.createWorkspaceMember('12323-123123-12321', workspace.UID, 'admin')
      member.changeRole('member')
      expect(member)
        .to.be.include({
          user_uid: '12323-123123-12321',
          workspace_uid: workspace.UID,
          role: 'member'
        })
    })

    it('change member role will throw an error if the role is same with current role', () => {
      let workspace = Workspace.createWorkspace('Foobar', 'foobar')
      let member = WorkspaceMember.createWorkspaceMember('12323-123123-12321', workspace.UID, 'admin')

      expect(() => member.changeRole('admin'))
        .to.throw(Error(WorkspaceMemberErrorAlreadyHasThisRole))
    })
  })
})
