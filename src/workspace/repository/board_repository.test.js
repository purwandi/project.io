const BoardRepositoryInMemory = require('./board_repository')
const chai = require('chai')
const Workspace = require('./../domain/workspace')
const Board = require('./../domain/board')
const { Error, RepositoryErrorIsNotInstanceOfBoard } = require('./repository_error')

describe('Board Repository Test Suite', () => {

  it('ca not save new board if the parameter is not instanceof board', () => {
    let repo = BoardRepositoryInMemory.init()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfBoard))

    chai.expect(() => repo.Save({ name: 'Foobar', UID: '2423432-23432432' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfBoard))
  })

  it('can save new board data into repository', () => {
    let repo = BoardRepositoryInMemory.init()
    let workspace = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let board = Board.createBoard(workspace.UID, 'Awesome board')

    repo.Save(board)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([ board ])
  })

  it('can find workspace by id', () => {
    let repo = BoardRepositoryInMemory.init()
    let workspace1 = Workspace.createWorkspace('Foobar 1', 'foobar-1')
    let workspace2 = Workspace.createWorkspace('Foobar 2', 'foobar-2')

    let board1 = Board.createBoard(workspace1.UID, 'Awesome board')
    let board2 = Board.createBoard(workspace2.UID, 'Awesome board')
    let board3 = Board.createBoard(workspace2.UID, 'Awesome board')

    repo.Save(board1)
    repo.Save(board2)
    repo.Save(board3)

    let data = repo.FindByID(board2.UID)

    chai.expect(data)
      .to.be.eql(board2)
  })
})
