'use strict'

class BoardRepository {

  constructor (boardMap = []) {
    this.boardMap = boardMap
  }

  Save (board) {
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
