const WorkspaceRepositoryInMemory = require('./workspace_repository')
const chai = require('chai')
const Workspace = require('./../domain/workspace')
const { Error, RepositoryErrorIsNotInstanceOfWorkspace } = require('./repository_error')

describe('Workspace Repository Test Suite', () => {

  it('ca not save new workspace if the parameter is not instanceof workspace', () => {
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

  it('can find workspace by id', () => {
    let repo = WorkspaceRepositoryInMemory.init()
    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let workspace3 = Workspace.createWorkspace('Foobar 3', 'foobar-3')

    repo.Save(workspace1)
    repo.Save(workspace2)
    repo.Save(workspace3)

    let data = repo.FindById(workspace2.UID)

    chai.expect(data)
      .to.be.eql(workspace2)
  })
})
