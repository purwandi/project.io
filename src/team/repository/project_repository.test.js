const chai = require('chai')
const ProjectRepositoryInMemory = require('./project_repository')
const { Error, RepositoryErrorIsNotInstanceOfProject } = require('./repository_error')
const Project = require('./../domain/project')
const Team = require('./../domain/team')

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
    let team = Team.createTeam('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(team.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(team.UID, 'Awesome board 2', 'awesome-board-2', 'public')
    let project3 = Project.createProject(team.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(project1)
    repo.Save(project2)
    repo.Save(project3)

    let projects = repo.FindAll()

    chai.expect(projects)
      .to.be.eql([ project1, project2, project3 ])
  })

  it('can update repository data', () => {
    let repo = ProjectRepositoryInMemory.init()

    let team = Team.createTeam('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(team.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(team.UID, 'Awesome board 2', 'awesome-board-2', 'public')
    let project3 = Project.createProject(team.UID, 'Awesome board 3', 'awesome-board-3', 'private')

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

  it('can find all project by team id', () => {
    let repo = ProjectRepositoryInMemory.init()

    let team1 = Team.createTeam('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(team1.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(team1.UID, 'Awesome board 2', 'awesome-board-2', 'public')

    let team2 = Team.createTeam('Foobar 2', 'foobar-2')
    let project3 = Project.createProject(team2.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(project1)
    repo.Save(project2)
    repo.Save(project3)

    let projects = repo.FindByTeamID(team1.UID)

    chai.expect(projects)
      .to.be.eql([project1, project2])
  })

  it('can find project by project id', () => {
    let repo = ProjectRepositoryInMemory.init()

    let team1 = Team.createTeam('Foobar 1', 'foobar-1')
    let project1 = Project.createProject(team1.UID, 'Awesome board 1', 'awesome-board-1', 'private')
    let project2 = Project.createProject(team1.UID, 'Awesome board 2', 'awesome-board-2', 'public')

    let team2 = Team.createTeam('Foobar 2', 'foobar-2')
    let project3 = Project.createProject(team2.UID, 'Awesome board 3', 'awesome-board-3', 'private')

    repo.Save(project1)
    repo.Save(project2)
    repo.Save(project3)

    let project = repo.FindByID(project2.UID)

    chai.expect(project)
      .to.be.eql(project2)
  })
})
