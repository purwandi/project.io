const chai = require('chai')
const chaiHttp = require('chai-http')
const { stringify } = require('./../../helpers/str')
const app = require('./../../app')()
const { WorkspaceRepositoryInMemory, ProjectRepositoryInMemory } = require('./../repository')
const { Workspace, Project } = require('./../domain')

let workspace1 = Workspace.createWorkspace('Gojek', 'gojek')
let workspace2 = Workspace.createWorkspace('Traveloka', 'traveloka')

let workspaceRepo = WorkspaceRepositoryInMemory.init()
workspaceRepo.Save(workspace1)
workspaceRepo.Save(workspace2)

let projectRepo = ProjectRepositoryInMemory.init()
let project = Project.createProject(workspace1.UID, 'Backend implementation', 'backend-implementaion', 'public')
projectRepo.Save(project)

app.use('/workspaces/:workspace/projects', require('./project_server')(workspaceRepo, projectRepo))

chai.use(chaiHttp)

describe('Project http service test', () => {

  it('can fetch all projects', (done) => {
    chai.request(app)
      .get('/workspaces/' + workspace1.UID + '/projects')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body).to.deep.eql({
          data: [ stringify(project) ]
        })
        done()
      })
  })

  it('can create a new project', (done) => {
    chai.request(app)
    .post('/workspaces/' + workspace1.UID + '/projects')
    .send({
      name: 'Foobar project',
      slug: 'foobar-project',
      visibility: 'private'
    })
    .end((err, res) => {
      chai.expect(res).to.have.status(200)
      chai.expect(res.body.data).to.include({
        name: 'Foobar project',
        slug: 'foobar-project',
        visibility: 'private'
      })
      done()
    })
  })

  it('can get project by UID', (done) => {
    chai.request(app)
      .get('/workspaces/' + workspace1.UID + '/projects/' + project.UID)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({
          name: 'Backend implementation',
          slug: 'backend-implementaion',
          visibility: 'public'
        })
        done()
      })
  })

  it('can update project', (done) => {
    let [ _project1, _project2 ] = projectRepo.FindAll()
    chai.request(app)
      .put('/workspaces/' + workspace1.UID + '/projects/' + _project2.UID)
      .send({
        name: 'Foobar',
        visibility: 'private'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({
          name: 'Foobar',
          visibility: 'private'
        })
        chai.expect(projectRepo.FindAll()).to.eql([ _project1, _project2 ])
        done()
      })
  })

  it('can remove project data',(done) => {
    let [ _project1, _project2 ] = projectRepo.FindAll()
    chai.request(app)
      .delete('/workspaces/' + workspace1.UID + '/projects/' + _project1.UID)
      .send({
        name: 'Foobar',
        visibility: 'private'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(projectRepo.FindAll()).to.eql([ _project2 ])
        done()
      })
  })

})
