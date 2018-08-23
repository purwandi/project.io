const chai = require('chai')
const Project = require('./project')
const Workspace = require('./workspace')
const {
  Error,
  ProjectErrorWorkspaceisNotEmpty,
  ProjectErrorNameisNotEmpty,
  ProjectErrorSlugisNotEmpty,
  ProjectErrorVisibilityisNotEmpty,
  ProjectErrorVisibilityInvalidType
} = require('./project_error')

describe('Project domain test', () => {
  describe('Project domain unit test suite', () => {

    it('can create project', () => {
      let workspace = Workspace.createWorkspace('Foobar workspace', 'foobar-workspace')
      let project = Project.createProject(workspace.UID, 'Project', 'project', 'public')

      chai.expect(project)
        .to.be.include({
          workspace_uid: workspace.UID,
          name: 'Project',
          slug: 'project',
          visibility: 'public'
        })
    })

    it('can change visibility level', () => {
      let workspace = Workspace.createWorkspace('Foobar workspace', 'foobar-workspace')
      let project = Project.createProject(workspace.UID, 'Project', 'project', 'public')

      chai.expect(project)
        .to.be.include({
          workspace_uid: workspace.UID,
          name: 'Project',
          slug: 'project',
          visibility: 'public'
        })

      project.changeVisibility('private')

      chai.expect(project)
        .to.be.include({
          workspace_uid: workspace.UID,
          name: 'Project',
          slug: 'project',
          visibility: 'private'
        })
    })

    it('can change project name', () => {
      let workspace = Workspace.createWorkspace('Foobar workspace', 'foobar-workspace')
      let project = Project.createProject(workspace.UID, 'Project', 'project', 'public')

      project.changeName('Project Name Change')

      chai.expect(project)
        .to.be.include({
          workspace_uid: workspace.UID,
          name: 'Project Name Change',
          slug: 'project',
          visibility: 'public'
        })
    })

    it('should throw error if the workspace parameter is no instance of Workspace class', () => {
      chai.expect(() => Project.createProject(''))
        .to.throw(Error(ProjectErrorWorkspaceisNotEmpty))
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
      let workspace = Workspace.createWorkspace('Foobar workspace', 'foobar-workspace')
      chai.expect(() => Project.createProject(workspace, 'Foobar project', 'foobar-project', 'none'))
        .to.throw(Error(ProjectErrorVisibilityInvalidType))

      let project1 = Project.createProject(workspace.UID, 'Foobar project', 'foobar-project', 'private')
      chai.expect(project1)
        .to.be.include({
          name: 'Foobar project',
          slug: 'foobar-project',
          visibility: 'private'
        })

      let project2 = Project.createProject(workspace.UID, 'Foobar project', 'foobar-project', 'public')
      chai.expect(project2)
        .to.be.include({
          name: 'Foobar project',
          slug: 'foobar-project',
          visibility: 'public'
        })
    })
  })
})
