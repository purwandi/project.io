const { NewBoardRepositoryInMemory } = require('./board_repository')
const chai = require('chai')
const Team = require('./../domain/team')
const Board = require('./../domain/board')
const { Error, RepositoryErrorIsNotInstanceOfBoard } = require('./repository_error')

describe('Board Repository Test Suite', () => {

  it ('ca not save new board if the parameter is not instanceof board', () => {
    let repo = NewBoardRepositoryInMemory()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfBoard))

    chai.expect(() => repo.Save({ name: 'Foobar', UID: '2423432-23432432' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfBoard))
  })

  it ('can save new board data into repository', () => {
    let repo = NewBoardRepositoryInMemory()
    let team = Team.createTeam('Foobar 1', 'foobar-1')
    let board = Board.createBoard(team, 'Awesome board')

    repo.Save(board)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([ board ])
  })

  it ('can find team by id', () => {
    let repo = NewBoardRepositoryInMemory()
    let team1 = Team.createTeam('Foobar 1', 'foobar-1')
    let team2 = Team.createTeam('Foobar 2', 'foobar-2')
    let team3 = Team.createTeam('Foobar 3', 'foobar-3')

    let board1 = Board.createBoard(team1, 'Awesome board')
    let board2 = Board.createBoard(team2, 'Awesome board')
    let board3 = Board.createBoard(team2, 'Awesome board')

    repo.Save(board1)
    repo.Save(board2)
    repo.Save(board3)

    let data = repo.FindByID(board2.UID)

    chai.expect(data)
      .to.be.eql(board2)
  })
})
