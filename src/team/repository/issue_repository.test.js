const { NewIssueRepositoryInMemory } = require('./issue_repository')
const chai = require('chai')
const Team = require('./../domain/team')
const Board = require('./../domain/board')
const Issue = require('./../domain/issue')
const { Error, RepositoryErrorIsNotInstanceOfIssue } = require('./repository_error')

describe('Issue Repository Test Suite', () => {

  it ('ca not save new issue if the parameter is not instanceof board', () => {
    let repo = NewIssueRepositoryInMemory()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfIssue))

    chai.expect(() => repo.Save({ title: 'Foobar', body: '2423432-23432432' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfIssue))
  })

  it ('can save new board data into repository', () => {
    let repo = NewIssueRepositoryInMemory()
    let team = Team.createTeam('Foobar 1', 'foobar-1')
    let board = Board.createBoard(team.UID, 'Awesome board')
    let issue = Issue.createIssue(board.UID, 'New issue')

    repo.Save(issue)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([ issue ])
  })

  it ('can find team by id', () => {
    let repo = NewIssueRepositoryInMemory()
    let team = Team.createTeam('Foobar 1', 'foobar-1')
    let board = Board.createBoard(team.UID, 'Awesome board')

    let issue1 = Issue.createIssue(board.UID, 'New title issue', 'Hallo body issuees')
    let issue2 = Issue.createIssue(board.UID, 'New title issue', 'Hallo body issuees')
    let issue3 = Issue.createIssue(board.UID, 'New title issue', 'Hallo body issuees')

    repo.Save(issue1)
    repo.Save(issue2)
    repo.Save(issue3)

    let data = repo.FindByID(issue2.UID)

    chai.expect(data)
      .to.be.eql(issue2)
  })
})
