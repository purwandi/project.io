'use strict'

const { Error, RepositoryErrorIsNotInstanceOfBoard } = require('./repository_error')
const Board = require('./../domain/board')

class BoardRepository {

  constructor (boardMap = []) {
    this.boardMap = boardMap
  }

  Save (board) {
    if (board instanceof Board === false) {
      throw Error(RepositoryErrorIsNotInstanceOfBoard)
    }

    this.boardMap.push(board)
  }

  FindAll () {
    return this.boardMap
  }

  FindByID (boardUID) {
    return this.boardMap.find(data => data.UID === boardUID)
  }
}

const NewBoardRepositoryInMemory = () => {
  return new BoardRepository()
}

module.exports = {
  NewBoardRepositoryInMemory
}
