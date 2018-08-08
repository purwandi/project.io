const chai = require('chai')
const Project = require('./project')
const Team = require('./team')
const {
  Error,
  ProjectErrorTeamisNotInstanceofTeam,
  ProjectErrorNameisNotEmpty,
  ProjectErrorSlugisNotEmpty,
  ProjectErrorVisibilityisNotEmpty,
  ProjectErrorVisibilityInvalidType
} = require('./project_error')

describe('Project domain test', () => {
  describe('Project domain unit test suite', () => {

    it ('can create project', () => {
      let team = Team.createTeam('Foobar team', 'foobar-team')
      let project = Project.createProject(team, 'Project', 'project', 'public')

      chai.expect(project)
        .to.be.include({
          team: team,
          name: 'Project',
          slug: 'project',
          visibility: 'public'
        })
    })

    it ('should throw error if the team parameter is no instance of Team class', () => {
      chai.expect(() => Project.createProject(''))
        .to.throw(Error(ProjectErrorTeamisNotInstanceofTeam))
    })

    it ('should throw error if the name is blank', () => {
      let team = Team.createTeam('Foobar team', 'foobar-team')
      chai.expect(() => Project.createProject(team))
        .to.throw(Error(ProjectErrorNameisNotEmpty))
    })

    it ('should throw error if the slug is blank', () => {
      let team = Team.createTeam('Foobar team', 'foobar-team')
      chai.expect(() => Project.createProject(team, 'Foobar project'))
        .to.throw(Error(ProjectErrorSlugisNotEmpty))
    })

    it ('should throw error if the visibility is blank', () => {
      let team = Team.createTeam('Foobar team', 'foobar-team')
      chai.expect(() => Project.createProject(team, 'Foobar project', 'foobar-project'))
        .to.throw(Error(ProjectErrorVisibilityisNotEmpty))
    })

    it ('should throw error if the visibility is not private or public', () => {
      let team = Team.createTeam('Foobar team', 'foobar-team')
      chai.expect(() => Project.createProject(team, 'Foobar project', 'foobar-project', 'none'))
        .to.throw(Error(ProjectErrorVisibilityInvalidType))

      chai.expect(() => Project.createProject(team, 'Foobar project', 'foobar-project', 'private'))
        .to.be.ok
      chai.expect(() => Project.createProject(team, 'Foobar project', 'foobar-project', 'public'))
        .to.be.ok
    })
  })
})
