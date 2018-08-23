const chai = require('chai')
const ProjectRepositoryInMemory = require('./project_repository')
const {
  Error,
  RepositoryErrorIsNotInstanceOfProject,
  RepositoryErrorProjectisNotFound
} = require('./repository_error')
const { Project, Workspace } = require('./../domain')

describe('Project Repository Test Suite', () => {
  it('ca not save new project if the parameter is not instanceof project', () => {
    let repo = ProjectRepositoryInMemory.init()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfProject))

    chai.expect(() => repo.Save({ title: 'Foobar', body: '2423432-23432432' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfProject))
  })

  it('can save new project data into repository', () => {
    let repo = ProjectRepositoryInMemory.init()
    let workspace = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(workspace.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(workspace.UID, 'Awesome board 2', 'awesome-board-2', 'public')
    let project3 = Project.createProject(workspace.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(project1)
    repo.Save(project2)
    repo.Save(project3)

    let projects = repo.FindAll()

    chai.expect(projects)
      .to.be.eql([ project1, project2, project3 ])
  })

  it('can update repository data', () => {
    let repo = ProjectRepositoryInMemory.init()

    let workspace = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(workspace.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(workspace.UID, 'Awesome board 2', 'awesome-board-2', 'public')
    let project3 = Project.createProject(workspace.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(project1)
    repo.Save(project2)
    repo.Save(project3)

    project2.changeVisibility('private')

    repo.Save(project2)

    let projects = repo.FindAll()

    chai.expect(projects)
      .to.be.eql([
        project1, project2, project3
      ])
  })

  it('can find all project by workspace id', () => {
    let repo = ProjectRepositoryInMemory.init()

    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(workspace1.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(workspace1.UID, 'Awesome board 2', 'awesome-board-2', 'public')

    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let project3 = Project.createProject(workspace2.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(project1)
    repo.Save(project2)
    repo.Save(project3)

    let projects = repo.FindByWorkspaceUID(workspace1.UID)

    chai.expect(projects)
      .to.be.eql([project1, project2])
  })

  it('can find project by project id', () => {
    let repo = ProjectRepositoryInMemory.init()

    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(workspace1.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(workspace1.UID, 'Awesome board 2', 'awesome-board-2', 'public')

    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let project3 = Project.createProject(workspace2.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(project1)
    repo.Save(project2)
    repo.Save(project3)

    let project = repo.FindByUID(project2.UID)

    chai.expect(project)
      .to.be.eql(project2)
  })

  it('should throw error if project is not found', () => {
    let repo = ProjectRepositoryInMemory.init()

    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(workspace1.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(workspace1.UID, 'Awesome board 2', 'awesome-board-2', 'public')

    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')
    let project3 = Project.createProject(workspace2.UID, 'Awesome board 3', 'awesome-board-3', 'private')
    let project4 = Project.createProject(workspace2.UID, 'Awesome board 4', 'awesome-board-4', 'private')

    repo.Save(project1)
    repo.Save(project2)
    repo.Save(project3)

    chai.expect(() => repo.FindByUID(project4.UID))
      .to.throw(Error(RepositoryErrorProjectisNotFound))
  })

  it('can remove project', () => {
    let repo = ProjectRepositoryInMemory.init()

    let workspace = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(workspace.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(workspace.UID, 'Awesome board 2', 'awesome-board-2', 'public')
    let project3 = Project.createProject(workspace.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(project1)
    repo.Save(project2)
    repo.Save(project3)

    repo.Remove(project2)

    let data = repo.FindAll()
    chai.expect(data)
      .to.be.eql([project1, project3])
  })

  it('should throw error when remove project', () => {
    let repo = ProjectRepositoryInMemory.init()

    let workspace = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(workspace.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(workspace.UID, 'Awesome board 2', 'awesome-board-2', 'public')
    let project3 = Project.createProject(workspace.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(project1)
    repo.Save(project2)

    chai.expect(() => repo.Remove(project3))
      .to.throw(Error(RepositoryErrorProjectisNotFound))
  })
})
