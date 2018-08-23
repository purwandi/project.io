const WorkspaceRepositoryInMemory = require('./workspace_repository')
const chai = require('chai')
const { Workspace } = require('./../domain')
const {
  Error,
  RepositoryErrorIsNotInstanceOfWorkspace,
  RepositoryErrorWorkspaceisNotFound
} = require('./repository_error')

describe('Workspace Repository Test Suite', () => {

  it('can not save new workspace if the parameter is not instanceof workspace', () => {
    let repo = WorkspaceRepositoryInMemory.init()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfWorkspace))

    chai.expect(() => repo.Save({ name: 'Foobar', UID: '2423432-23432432' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfWorkspace))
  })

  it('can save new workspace data into repository', () => {
    let repo = WorkspaceRepositoryInMemory.init()
    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')

    repo.Save(workspace1)
    repo.Save(workspace2)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([workspace1, workspace2])
  })

  it('can update workspace', () => {
    let repo = WorkspaceRepositoryInMemory.init()
    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')

    repo.Save(workspace1)
    repo.Save(workspace2)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([workspace1, workspace2])

    workspace2.changeName('Foobar 3')

    data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([workspace1, workspace2])
  })

  it('can find workspace by id', () => {
    let repo = WorkspaceRepositoryInMemory.init()
    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let workspace3 = Workspace.createWorkspace('Foobar 3', 'foobar-3')

    repo.Save(workspace1)
    repo.Save(workspace2)
    repo.Save(workspace3)

    let data = repo.FindByUID(workspace2.UID)

    chai.expect(data)
      .to.be.eql(workspace2)
  })

  it('should throw error if the workspace is not found', () => {
    let repo = WorkspaceRepositoryInMemory.init()
    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let workspace3 = Workspace.createWorkspace('Foobar 3', 'foobar-3')
    let workspace4 = Workspace.createWorkspace('Foobar 4', 'foobar-3')

    repo.Save(workspace1)
    repo.Save(workspace2)
    repo.Save(workspace3)

    chai.expect(() => repo.FindByUID(workspace4.UID))
      .to.throw(Error(RepositoryErrorWorkspaceisNotFound))
  })

  it('can remove workspace from repository', () => {
    let repo = WorkspaceRepositoryInMemory.init()
    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let workspace3 = Workspace.createWorkspace('Foobar 3', 'foobar-3')

    repo.Save(workspace1)
    repo.Save(workspace2)
    repo.Save(workspace3)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([workspace1, workspace2, workspace3])

    repo.Remove(workspace2)

    data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([workspace1, workspace3])
  })

  it('should throw error if workspace is not found', () => {
    let repo = WorkspaceRepositoryInMemory.init()
    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let workspace3 = Workspace.createWorkspace('Foobar 3', 'foobar-3')
    let workspace4 = Workspace.createWorkspace('Foobar 4', 'foobar-3')

    repo.Save(workspace1)
    repo.Save(workspace2)
    repo.Save(workspace3)

    chai.expect(() => repo.Remove(workspace4))
      .to.throw(Error(RepositoryErrorWorkspaceisNotFound))
  })
})
