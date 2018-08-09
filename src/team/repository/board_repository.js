'use strict'

const { Error, RepositoryErrorIsNotInstanceOfBoard } = require('./repository_error')
const Board = require('./../domain/board')

class BoardRepositoryInMemory {

  constructor (boardMap) {
    this.boardMap = boardMap || []
  }

  static init (boardMap) {
    return new BoardRepositoryInMemory(boardMap)
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

module.exports = BoardRepositoryInMemory
