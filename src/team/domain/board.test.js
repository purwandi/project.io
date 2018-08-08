const chai = require('chai')
const Board = require('./board')
const Team = require('./team')
const Issue = require('./issue')
const {
  Error,
  BoardErrorNameisNotEmpty,
  BoardErrorTeamisNotEmpty
} = require('./board_error')

describe('Board domain test', () => {
  describe('Board domain unit test suite', () => {
    it ('should throw an error if the given team is blank', () => {
      chai.expect(() => Board.createBoard('', ''))
        .to.throw(Error(BoardErrorTeamisNotEmpty))
    })

    it ('should throw an error if the given team is blank', () => {
      t = Team.createTeam('Foobar', 'foobar')
      chai.expect(() => Board.createBoard(t, ''))
        .to.throw(Error(BoardErrorNameisNotEmpty))
    })

    it ('can create new board', () => {
      t = Team.createTeam('Foobar', 'foobar')
      b = Board.createBoard(t, 'halo')

      chai.expect(b)
        .to.be.include({
          name: 'halo',
          team: t
        })
    })

    it ('can change board name', () => {
      t = Team.createTeam('Foobar', 'foobar')
      b = Board.createBoard(t, 'Awesome Board')
      b.changeName('Board Only')

      chai.expect(b)
        .to.be.include({
          UID: b.UID,
          name: 'Board Only'
        })
    })

    it ('can attach the issue from given board', () => {
      t = Team.createTeam('Foobar', 'foobar')
      b = Board.createBoard(t, 'Awesome Board')
      issue1 = Issue.createIssue(t, 'Awesome issue 1')
      issue2 = Issue.createIssue(t, 'Awesome issue 2')

      b.addIssue(issue1)
      b.addIssue(issue2)

      chai.expect(b.issues)
        .to.eql([ issue1, issue2 ])
    })
  })
})
