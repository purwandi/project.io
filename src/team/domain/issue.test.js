const chai = require('chai')
const { Error, IssueErrorTitleisNotEmpty, IssueErrorBoardIsNotEmpty } = require('./issue_error')
const Team = require('./team')
const Issue = require('./issue')
const Board = require('./board')

describe('Issue domain test', () => {
  describe('Issue domain test suite', () => {
    it ('should be throw an error if the title is empty', () => {
      chai.expect(() => Issue.createIssue())
        .to.throw(Error(IssueErrorBoardIsNotEmpty))
    })

    it ('can create an issue', () => {
      t = Team.createTeam('Foobar', 'foobar')
      b = Board.createBoard(t, 'halo')
      let issue = Issue.createIssue(b, 'The issue title')

      chai.expect(issue)
        .to.be.include({
          title: 'The issue title',
          body: null
        })
    })

    it ('can change issue title in issue', () => {
      t = Team.createTeam('Foobar', 'foobar')
      b = Board.createBoard(t, 'halo')
      let issue = Issue.createIssue(t, 'The issue title')
      issue.changeTitle('This title is changed')

      chai.expect(issue)
        .to.be.include({
          title: 'This title is changed',
          body: null
        })
    })

    it ('can change issue body', () => {
      t = Team.createTeam('Foobar', 'foobar')
      b = Board.createBoard(t, 'halo')
      let issue = Issue.createIssue(t, 'The issue title')
      issue.changeBody('This body is changed')

      chai.expect(issue)
        .to.be.include({
          title: 'The issue title',
          body: 'This body is changed'
        })
    })
  })
})
