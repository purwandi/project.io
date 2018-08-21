const chai = require('chai')
const Board = require('./board')
const {
  Error,
  BoardErrorNameisNotEmpty,
  BoardErrorProjectisNotEmpty
} = require('./board_error')

describe('Board domain test', () => {
  describe('Board domain unit test suite', () => {
    it('should throw an error if the given team is blank', () => {
      chai.expect(() => Board.createBoard('', ''))
        .to.throw(Error(BoardErrorProjectisNotEmpty))
    })

    it('should throw an error if the given name is blank', () => {
      chai.expect(() => Board.createBoard('1231-12312', ''))
        .to.throw(Error(BoardErrorNameisNotEmpty))
    })

    it('can create new board', () => {
      let b = Board.createBoard('1231-12312', 'halo')

      chai.expect(b)
        .to.be.include({
          name: 'halo',
          project_uid: '1231-12312'
        })
    })

    it('can change board name', () => {
      let b = Board.createBoard('1231-12312', 'Awesome Board')
      b.changeName('Board Only')

      chai.expect(b)
        .to.be.include({
          UID: b.UID,
          name: 'Board Only',
          project_uid: '1231-12312'
        })
    })
  })
})
