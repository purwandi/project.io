const chai = require('chai')
const chaiHttp = require('chai-http')
const { stringify } = require('./../../helpers/str')
const app = require('./../../app')()
const { ProjectRepositoryInMemory, IssueRepositoryInMemory } = require('./../repository')
const { Project, Issue } = require('./../domain')

let projectRepo = ProjectRepositoryInMemory.init()
let issueRepo = IssueRepositoryInMemory.init()

let project = Project.createProject('p332-323', 'Sukarasa Project', 'sukarasa', 'private')
projectRepo.Save(project)

let issue1 = Issue.createIssue(project.UID, 'user-1', 'Title issue #1', 'Content issue #1')
let issue2 = Issue.createIssue(project.UID, 'user-1', 'Title issue #2', 'Content issue #2')
let issue3 = Issue.createIssue(project.UID, 'user-1', 'Title issue #3', 'Content issue #3')

issueRepo.Save(issue1)
issueRepo.Save(issue2)
issueRepo.Save(issue3)

app.use('/workspaces/:workspace/projects/:project/issues', require('./issue_server')(projectRepo, issueRepo))

chai.use(chaiHttp)

describe('Issue http service test', () => {
  it('can fetch all issues by project UID', (done) => {
    chai.request(app)
      .get('/workspaces/some-workspace/projects/' + project.UID + '/issues')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body).to.deep.eql({
          data: [ stringify(issue1), stringify(issue2), stringify(issue3) ]
        })
        done()
      })
  })

  it('can create a new issue in project', (done) => {
    chai.request(app)
      .post('/workspaces/some-workspace/projects/' + project.UID + '/issues')
      .send({
        title: 'Issue #4',
        body: 'This is a content from issue #4'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({
          title: 'Issue #4',
          body: 'This is a content from issue #4'
        })
        done()
      })
  })

  it('can get issue by issue UID', (done) => {
    chai.request(app)
      .get('/workspaces/some-workspace/projects/' + project.UID + '/issues/' + issue1.UID)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({
          title: 'Title issue #1',
          body: 'Content issue #1'
        })
        done()
      })
  })

  it('can update issue', (done) => {
    chai.request(app)
      .put('/workspaces/some-workspace/projects/' + project.UID + '/issues/' + issue1.UID)
      .send({
        title: 'Title issue #11',
        body: 'Content issue #11'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data).to.include({
          title: 'Title issue #11',
          body: 'Content issue #11'
        })
        done()
      })
  })

  it('can delete issue', (done) => {
    let [ _issue1, _issue2, _issue3, _issue4 ] = issueRepo.FindAll()

    chai.request(app)
      .delete('/workspaces/some-workspace/projects/' + project.UID + '/issues/' + _issue2.UID)
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(issueRepo.FindAll()).to.eql([ _issue1, _issue3, _issue4 ])
        done()
      })
  })
})
