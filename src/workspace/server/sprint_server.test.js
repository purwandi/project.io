const chai = require('chai')
const chaiHttp = require('chai-http')
const { stringify } = require('./../../helpers/str')
const app = require('./../../app')()
const { ProjectRepositoryInMemory, SprintRepositoryInMemory } = require('./../repository')
const { Project, Sprint } = require('./../domain')

let projectRepo = ProjectRepositoryInMemory.init()
let sprintRepo = SprintRepositoryInMemory.init()

let project = Project.createProject('p332-323', 'Sukarasa Project', 'sukarasa', 'private')
projectRepo.Save(project)

let sprint1 = Sprint.createSprint(project.UID, 'Sprint 1')
let sprint2 = Sprint.createSprint(project.UID, 'Sprint 2')
let sprint3 = Sprint.createSprint(project.UID, 'Sprint 3')

sprintRepo.Save(sprint1)
sprintRepo.Save(sprint2)
sprintRepo.Save(sprint3)

app.use('/workspaces/:workspace/projects/:project/sprints', require('./sprint_server')(projectRepo, sprintRepo))

chai.use(chaiHttp)

describe('Sprint http service test', () => {
  it('can fetch all sprint by project UID', (done) => {
    chai.request(app)
      .get('/workspaces/some-workspace/projects/' + project.UID + '/sprints')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body).to.deep.eql({
          data: [ stringify(sprint1), stringify(sprint2), stringify(sprint3) ]
        })
        done()
      })
  })

  it('can get sprint by UID', (done) => {
    chai.request(app)
      .get('/workspaces/some-workspace/projects/' + project.UID + '/sprints/' + sprint1.UID)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body).to.deep.eql({
          data: stringify(sprint1)
        })
        done()
      })
  })

  it('can create sprint', (done) => {
    chai.request(app)
      .post('/workspaces/some-workspace/projects/' + project.UID + '/sprints/')
      .send({
        name: 'Sprint 4'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({ name: 'Sprint 4', project_uid: project.UID, status: 'open' })
        done()
      })
  })

  it('can update sprint name', (done) => {
    chai.request(app)
      .put('/workspaces/some-workspace/projects/' + project.UID + '/sprints/' + sprint1.UID)
      .send({
        name: 'Sprint 11'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({ name: 'Sprint 11', project_uid: project.UID, status: 'open' })
        done()
      })
  })

  it('can start sprint', (done) => {
    chai.request(app)
      .put('/workspaces/some-workspace/projects/' + project.UID + '/sprints/' + sprint1.UID + '/start')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({ name: 'Sprint 11', project_uid: project.UID, status: 'ongoing' })
        done()
      })
  })

  it('can close sprint', (done) => {
    chai.request(app)
      .put('/workspaces/some-workspace/projects/' + project.UID + '/sprints/' + sprint1.UID + '/close')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({ name: 'Sprint 11', project_uid: project.UID, status: 'closed' })
        done()
      })
  })

  it('can remove sprint', (done) => {
    let [ _sprint1, _sprint2, _sprint3, _sprint4 ] = sprintRepo.FindAll()

    chai.request(app)
      .delete('/workspaces/some-workspace/projects/' + project.UID + '/sprints/' + _sprint2.UID)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(sprintRepo.FindAll()).to.eql([ _sprint1, _sprint3, _sprint4 ])
        done()
      })
  })
})
