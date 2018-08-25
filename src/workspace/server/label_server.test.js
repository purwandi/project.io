const chai = require('chai')
const chaiHttp = require('chai-http')
const { stringify } = require('./../../helpers/str')
const app = require('./../../app')()
const { WorkspaceRepositoryInMemory, LabelRepositoryInMemory } = require('./../repository')
const { Workspace, Label } = require('./../domain')
const { Error, RepositoryErrorWorkspaceisNotFound } = require('./../repository/repository_error')

let workspace1 = Workspace.createWorkspace('Gojek', 'gojek')
let workspace2 = Workspace.createWorkspace('Traveloka', 'traveloka')

let workspaceRepo = WorkspaceRepositoryInMemory.init()
workspaceRepo.Save(workspace1)
workspaceRepo.Save(workspace2)

let labelRepo = LabelRepositoryInMemory.init()
let label = Label.createLabel(workspace1.UID, 'todo', '#0001')
labelRepo.Save(label)

app.use('/workspaces/:workspace/labels', require('./label_server')(workspaceRepo, labelRepo))

chai.use(chaiHttp)

describe('Label http service test', () => {

  it('can fetch all labels', (done) => {
    chai.request(app)
      .get('/workspaces/' + workspace1.UID + '/labels')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body).to.deep.eql({
          data: [ stringify(label) ]
        })
        done()
      })
  })

  it('should response http error if work workspace UID', (done) => {
    chai.request(app)
      .get('/workspaces/94354343/labels')
      .end((err, res) => {
        chai.expect(res).to.have.status(400)
        chai.expect(res.body).to.be.include({ error: Error(RepositoryErrorWorkspaceisNotFound) })
        done()
      })
  })

  it('can create a new label', (done) => {
    chai.request(app)
    .post('/workspaces/' + workspace1.UID + '/labels')
    .send({
      name: 'doing',
      color: '#fff'
    })
    .end((err, res) => {
      chai.expect(res).to.have.status(200)
      chai.expect(res.body.data).to.include({
        name: 'doing',
        color: '#fff'
      })
      done()
    })
  })

  it('can get label by UID', (done) => {
    chai.request(app)
      .get('/workspaces/' + workspace1.UID + '/labels/' + label.UID)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({
          name: 'todo',
          color: '#0001'
        })
        done()
      })
  })

  it('can update label', (done) => {
    let [ _label1, _label2 ] = labelRepo.FindAll()
    chai.request(app)
      .put('/workspaces/' + workspace1.UID + '/labels/' + _label2.UID)
      .send({
        name: 'done',
        color: '#000'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({
          name: 'done',
          color: '#000'
        })
        chai.expect(labelRepo.FindAll()).to.eql([ _label1, _label2 ])
        done()
      })
  })

  it('can remove label data',(done) => {
    let [ _label1, _label2 ] = labelRepo.FindAll()
    chai.request(app)
      .delete('/workspaces/' + workspace1.UID + '/labels/' + _label1.UID)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(labelRepo.FindAll()).to.eql([ _label2 ])
        done()
      })
  })

})
