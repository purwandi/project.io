const chai = require('chai')
const chaiHttp = require('chai-http')
const { stringify } = require('./../../helpers/str')
const app = require('./../../app')()
const { WorkspaceRepositoryInMemory, WorkspaceMemberRepositoryInMemory } = require('./../repository')
const { Workspace, WorkspaceMember } = require('./../domain')

let workspace1 = Workspace.createWorkspace('Gojek', 'gojek')
let workspace2 = Workspace.createWorkspace('Traveloka', 'traveloka')

let workspaceRepo = WorkspaceRepositoryInMemory.init()
workspaceRepo.Save(workspace1)
workspaceRepo.Save(workspace2)

let wMemberRepo = WorkspaceMemberRepositoryInMemory.init()
let wMember1 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', workspace1.UID, 'admin')
let wMember2 = WorkspaceMember.createWorkspaceMember('12323-123123-12321', workspace2.UID, 'member')
let wMember3 = WorkspaceMember.createWorkspaceMember('12323-123123-12322', workspace1.UID, 'admin')
wMemberRepo.Save(wMember1)
wMemberRepo.Save(wMember2)
wMemberRepo.Save(wMember3)

app.use('/workspaces/:workspace/members', require('./workspace_member_server')(workspaceRepo, wMemberRepo))

chai.use(chaiHttp)

describe('Workspace Member http service test', () => {

  it('can fetch all workspace member', (done) => {
    chai.request(app)
      .get('/workspaces/' + workspace1.UID + '/members')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body).to.deep.eql({
          data: [ stringify(wMember1), stringify(wMember3) ]
        })
        done()
      })
  })

  it('can save workspace member', (done) => {
    chai.request(app)
      .post('/workspaces/' + workspace1.UID + '/members')
      .send({
        user_uid: '121212-12121-12123',
        role: 'member'
      })
      .end((err, res) => {
        wMemberRepo.FindAll()
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({
          user_uid: '121212-12121-12123',
          role: 'member',
          workspace_uid: workspace1.UID
        })
        done()
      })
  })

  it('can remove workspace member', (done) => {
    let [ _member1, _member2, _member3, _member4 ] = wMemberRepo.FindAll()
    chai.request(app)
      .delete('/workspaces/' + workspace1.UID + '/members/' + _member4.user_uid)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(wMemberRepo.FindAll()).to.eql([ _member1, _member2, _member3 ])
        done()
      })
  })

})
