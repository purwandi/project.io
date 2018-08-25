const chai = require('chai')
const chaiHttp = require('chai-http')
const { stringify } = require('./../../helpers/str')
const app = require('./../../app')()
const { WorkspaceRepositoryInMemory } = require('./../repository')
const { Workspace } = require('./../domain')

let workspace1 = Workspace.createWorkspace('Gojek', 'gojek')
let workspace2 = Workspace.createWorkspace('Traveloka', 'traveloka')

let workspaceRepo = WorkspaceRepositoryInMemory.init()
workspaceRepo.Save(workspace1)
workspaceRepo.Save(workspace2)

app.use('/workspaces', require('./workspace_server')(workspaceRepo))

chai.use(chaiHttp)

describe('Workspace http service test', () => {
  it('should get all workspace data', (done) => {
    chai.request(app)
      .get('/workspaces')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body).to.deep.eql({
          data: [ stringify(workspace1), stringify(workspace2) ]
        })
        done()
      })
  })

  it('can create workspace', (done) => {
    chai.request(app)
      .post('/workspaces')
      .send({
        name: 'Bukalapak',
        slug: 'bukalapak'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.be.include({ name: 'Bukalapak', slug: 'bukalapak' })
        done()
      })
  })

  it('can fetch workspace by UID', (done) => {
    chai.request(app)
      .get('/workspaces/' + workspace1.UID)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.be.include({ name: 'Gojek', slug: 'gojek' })
        done()
      })
  })

  it('can update workspace', (done) => {
    chai.request(app)
      .put('/workspaces/' + workspace1.UID)
      .send({
        name: 'Gojek 1'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.be.include({ name: 'Gojek 1', slug: 'gojek' })
        done()
      })
  })

  it('can delete workspace', (done) => {
    let [ _workspace1, _workspace2, _workspace3 ] = workspaceRepo.FindAll()

    chai.request(app)
      .delete('/workspaces/' + _workspace1.UID)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(workspaceRepo.FindAll()).to.eql([ _workspace2, _workspace3 ])
        done()
      })
  })
})
