const chai = require('chai')
const Project = require('./project')
const Team = require('./team')
const {
  Error,
  ProjectErrorTeamisNotEmpty,
  ProjectErrorNameisNotEmpty,
  ProjectErrorSlugisNotEmpty,
  ProjectErrorVisibilityisNotEmpty,
  ProjectErrorVisibilityInvalidType
} = require('./project_error')

describe('Project domain test', () => {
  describe('Project domain unit test suite', () => {

    it('can create project', () => {
      let team = Team.createTeam('Foobar team', 'foobar-team')
      let project = Project.createProject(team.UID, 'Project', 'project', 'public')

      chai.expect(project)
        .to.be.include({
          teamUID: team.UID,
          name: 'Project',
          slug: 'project',
          visibility: 'public'
        })
    })

    it('can change visibility level', () => {
      let team = Team.createTeam('Foobar team', 'foobar-team')
      let project = Project.createProject(team.UID, 'Project', 'project', 'public')

      chai.expect(project)
        .to.be.include({
          teamUID: team.UID,
          name: 'Project',
          slug: 'project',
          visibility: 'public'
        })

      project.changeVisibility('private')

      chai.expect(project)
        .to.be.include({
          teamUID: team.UID,
          name: 'Project',
          slug: 'project',
          visibility: 'private'
        })
    })

    it('should throw error if the team parameter is no instance of Team class', () => {
      chai.expect(() => Project.createProject(''))
        .to.throw(Error(ProjectErrorTeamisNotEmpty))
    })

    it('should throw error if the name is blank', () => {
      chai.expect(() => Project.createProject('12312312321'))
        .to.throw(Error(ProjectErrorNameisNotEmpty))
    })

    it('should throw error if the slug is blank', () => {
      chai.expect(() => Project.createProject('23423423', 'Foobar project'))
        .to.throw(Error(ProjectErrorSlugisNotEmpty))
    })

    it('should throw error if the visibility is blank', () => {
      chai.expect(() => Project.createProject('12312312', 'Foobar project', 'foobar-project'))
        .to.throw(Error(ProjectErrorVisibilityisNotEmpty))
    })

    it('should throw error if the visibility is not private or public', () => {
      let team = Team.createTeam('Foobar team', 'foobar-team')
      chai.expect(() => Project.createProject(team, 'Foobar project', 'foobar-project', 'none'))
        .to.throw(Error(ProjectErrorVisibilityInvalidType))

      let project1 = Project.createProject(team.UID, 'Foobar project', 'foobar-project', 'private')
      chai.expect(project1)
        .to.be.include({
          name: 'Foobar project',
          slug: 'foobar-project',
          visibility: 'private'
        })

      let project2 = Project.createProject(team.UID, 'Foobar project', 'foobar-project', 'public')
      chai.expect(project2)
        .to.be.include({
          name: 'Foobar project',
          slug: 'foobar-project',
          visibility: 'public'
        })
    })
  })
})
