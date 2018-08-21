const IssueRepositoryInMemory = require('./issue_repository')
const chai = require('chai')
const Issue = require('./../domain/issue')
const { Error, RepositoryErrorIsNotInstanceOfIssue } = require('./repository_error')

describe('Issue Repository Test Suite', () => {

  it('ca not save new issue if the parameter is not instanceof board', () => {
    let repo = IssueRepositoryInMemory.init()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfIssue))

    chai.expect(() => repo.Save({ title: 'Foobar', body: '2423432-23432432' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfIssue))
  })

  it('can save new board data into repository', () => {
    let repo = IssueRepositoryInMemory.init()
    let issue = Issue.createIssue('1223323', 'user-1', 'New issue')

    repo.Save(issue)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([ issue ])
  })

  it('can find team by id', () => {
    let repo = IssueRepositoryInMemory.init()

    let issue1 = Issue.createIssue('1222-12221', 'user-1', 'New title issue', 'Hallo body issuees')
    let issue2 = Issue.createIssue('1222-12221', 'user-1', 'New title issue', 'Hallo body issuees')
    let issue3 = Issue.createIssue('1222-12221', 'user-2', 'New title issue', 'Hallo body issuees')

    repo.Save(issue1)
    repo.Save(issue2)
    repo.Save(issue3)

    let data = repo.FindByID(issue2.UID)

    chai.expect(data)
      .to.be.eql(issue2)
  })

  it('can find all issue by created by', () => {
    let repo = IssueRepositoryInMemory.init()

    let issue1 = Issue.createIssue('1221-212', 'user-1', 'New title issue', 'Hallo body issuees')
    let issue2 = Issue.createIssue('1221-212', 'user-1', 'New title issue', 'Hallo body issuees')
    let issue3 = Issue.createIssue('1221-212', 'user-2', 'New title issue', 'Hallo body issuees')

    repo.Save(issue1)
    repo.Save(issue2)
    repo.Save(issue3)

    let data = repo.FindAllByCreatedBy('user-2')

    chai.expect(data)
      .to.be.eql([issue3])
  })

  it('can find all issue by project id', () => {
    let repo = IssueRepositoryInMemory.init()

    let issue1 = Issue.createIssue('1221-212', 'user-1', 'New title issue', 'Hallo body issuees')
    let issue2 = Issue.createIssue('1221-211', 'user-1', 'New title issue', 'Hallo body issuees')
    let issue3 = Issue.createIssue('1221-212', 'user-2', 'New title issue', 'Hallo body issuees')

    repo.Save(issue1)
    repo.Save(issue2)
    repo.Save(issue3)

    let data = repo.FindAllByProjectUID('1221-211')

    chai.expect(data)
      .to.be.eql([issue2])
  })
})
