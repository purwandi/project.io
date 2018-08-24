const chai = require('chai')
const LabelRepositoryInMemory = require('./label_repository')
const {
  Error,
  RepositoryErrorIsNotInstanceOfLabel,
  RepositoryErrorLabelisNotFound
} = require('./repository_error')
const { Label, Workspace } = require('./../domain')

describe('Label Repository Test Suite', () => {
  it('can not save new label if the parameter is not instanceof label', () => {
    let repo = LabelRepositoryInMemory.init()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfLabel))

    chai.expect(() => repo.Save({ title: 'Foobar', body: '2423432-23432432' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfLabel))
  })

  it('can save new label data into repository', () => {
    let repo = LabelRepositoryInMemory.init()
    let workspace = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let label1 = Label.createLabel(workspace.UID, 'todo', '#00011')
    let label2 = Label.createLabel(workspace.UID, 'doing', '#00012')
    let label3 = Label.createLabel(workspace.UID, 'done', '#00013')

    repo.Save(label1)
    repo.Save(label2)
    repo.Save(label3)

    let labels = repo.FindAll()

    chai.expect(labels)
      .to.be.eql([ label1, label2, label3 ])
  })

  it('can update repository data', () => {
    let repo = LabelRepositoryInMemory.init()

    let workspace = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let label1 = Label.createLabel(workspace.UID, 'todo', '#00011')
    let label2 = Label.createLabel(workspace.UID, 'doing', '#00012')
    let label3 = Label.createLabel(workspace.UID, 'done', '#00013')

    repo.Save(label1)
    repo.Save(label2)
    repo.Save(label3)

    label2.changeName('work in progress')
    label2.changeColor('#001')

    repo.Save(label2)

    let labels = repo.FindAll()

    chai.expect(labels)
      .to.be.eql([
        label1, label2, label3
      ])
  })

  it('can find all label by workspace id', () => {
    let repo = LabelRepositoryInMemory.init()

    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let label1 = Label.createLabel(workspace1.UID, 'todo', '#00011')
    let label2 = Label.createLabel(workspace1.UID, 'doing', '#00012')
    let label3 = Label.createLabel(workspace1.UID, 'done', '#00013')

    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let label4 = Label.createLabel(workspace2.UID, 'ready to merge', '#00013')

    repo.Save(label1)
    repo.Save(label2)
    repo.Save(label3)
    repo.Save(label4)

    chai.expect(repo.FindByWorkspaceUID(workspace1.UID))
      .to.be.eql([label1, label2, label3])

    chai.expect(repo.FindByWorkspaceUID(workspace2.UID))
      .to.be.eql([label4])
  })

  it('can find label by label id', () => {
    let repo = LabelRepositoryInMemory.init()

    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let label1 = Label.createLabel(workspace1.UID, 'todo', '#00011')
    let label2 = Label.createLabel(workspace1.UID, 'doing', '#00012')

    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let label3 = Label.createLabel(workspace2.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(label1)
    repo.Save(label2)
    repo.Save(label3)

    let label = repo.FindByUID(label2.UID)

    chai.expect(label)
      .to.be.eql(label2)
  })

  it('should throw error if label is not found', () => {
    let repo = LabelRepositoryInMemory.init()

    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let label1 = Label.createLabel(workspace1.UID, 'todo', '#00011')
    let label2 = Label.createLabel(workspace1.UID, 'doing', '#00012')

    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let label3 = Label.createLabel(workspace2.UID, 'done', '#00013')
    let label4 = Label.createLabel(workspace2.UID, 'done', '#00013')

    repo.Save(label1)
    repo.Save(label2)
    repo.Save(label3)

    chai.expect(() => repo.FindByUID(label4.UID))
      .to.throw(Error(RepositoryErrorLabelisNotFound))
  })

  it('can remove label', () => {
    let repo = LabelRepositoryInMemory.init()

    let workspace = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let label1 = Label.createLabel(workspace.UID, 'todo', '#00011')
    let label2 = Label.createLabel(workspace.UID, 'doing', '#00012')
    let label3 = Label.createLabel(workspace.UID, 'done', '#00013')

    repo.Save(label1)
    repo.Save(label2)
    repo.Save(label3)

    repo.Remove(label2)

    let data = repo.FindAll()
    chai.expect(data)
      .to.be.eql([label1, label3])
  })

  it('should throw error when remove label', () => {
    let repo = LabelRepositoryInMemory.init()

    let workspace = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let label1 = Label.createLabel(workspace.UID, 'todo', '#00011')
    let label2 = Label.createLabel(workspace.UID, 'doing', '#00012')
    let label3 = Label.createLabel(workspace.UID, 'done', '#00013')

    repo.Save(label1)
    repo.Save(label2)

    chai.expect(() => repo.Remove(label3))
      .to.throw(Error(RepositoryErrorLabelisNotFound))
  })
})
