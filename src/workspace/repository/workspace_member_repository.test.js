const chai = require('chai')
const WorkspaceMemberRepositoryInMemory = require('./workspace_member_repository')
const WorkspaceMember = require('./../domain/workspace_member')

describe('Workspace Member Repository Test', () => {
  it('can save new workspace member', () => {
    let repo = WorkspaceMemberRepositoryInMemory.init()

    let member1 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', '22323-123123-12321', 'admin')
    let member2 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', '22323-123123-12322', 'member')
    let member3 = WorkspaceMember.createWorkspaceMember('12323-123123-12322', '22323-123123-12321', 'admin')

    repo.Save(member1)
    repo.Save(member2)
    repo.Save(member3)

    let members = repo.FindAll()

    chai.expect(members)
      .to.be.eql([
        member1, member2, member3
      ])

  })

  it('can udpate repository data', () => {
    let repo = WorkspaceMemberRepositoryInMemory.init()

    let member1 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', '22323-123123-12321', 'admin')
    let member2 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', '22323-123123-12322', 'member')
    let member3 = WorkspaceMember.createWorkspaceMember('12323-123123-12322', '22323-123123-12321', 'admin')
    let member4 = WorkspaceMember.createWorkspaceMember('12323-123123-12322', '22323-123123-12321', 'member')

    repo.Save(member1)
    repo.Save(member2)
    repo.Save(member3)
    repo.Save(member4)

    let members = repo.FindAll()

    chai.expect(members)
      .to.be.eql([
        member1, member2, member4
      ])

  })

  it('can find all find workspace by user id', () => {
    let repo = WorkspaceMemberRepositoryInMemory.init()

    let member1 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', '22323-123123-12321', 'admin')
    let member2 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', '22323-123123-12322', 'member')
    let member3 = WorkspaceMember.createWorkspaceMember('12323-123123-12322', '22323-123123-12321', 'admin')
    let member4 = WorkspaceMember.createWorkspaceMember('12323-123123-12322', '22323-123123-12321', 'member')

    repo.Save(member1)
    repo.Save(member2)
    repo.Save(member3)
    repo.Save(member4)

    let members = repo.FindAllByUserId('12323-123123-12321')

    chai.expect(members)
      .to.be.eql([member1, member2])
  })

  it('can find all find workspace by workspace id', () => {
    let repo = WorkspaceMemberRepositoryInMemory.init()

    let member1 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', '22323-123123-12321', 'admin')
    let member2 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', '22323-123123-12322', 'member')
    let member3 = WorkspaceMember.createWorkspaceMember('12323-123123-12322', '22323-123123-12321', 'admin')
    let member4 = WorkspaceMember.createWorkspaceMember('12323-123123-12322', '22323-123123-12321', 'member')

    repo.Save(member1)
    repo.Save(member2)
    repo.Save(member3)
    repo.Save(member4)

    let members = repo.FindAllByWorkspaceID('22323-123123-12321')

    chai.expect(members)
      .to.be.eql([member1, member4])
  })
})
