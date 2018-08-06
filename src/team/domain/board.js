const { Model } = require('objectmodel')
const uuid = require('uuid')

const Team = require('./team')
const {
  Error,
  BoardErrorNameisNotEmpty,
  BoardErrorTeamisNotEmpty
} = require('./board_error')

const BoardProperty = Model({
  UID: String,
  name: String,
  team: Team,
  created_at: Date,
  updated_at: [Date]
})

class Board extends BoardProperty {

  static createBoard (team, name) {

    if (!team) {
      throw Error(BoardErrorTeamisNotEmpty)
    }

    if (!name) {
      throw Error(BoardErrorNameisNotEmpty)
    }

    return new Board({
      UID: uuid.v4(),
      name: name,
      team: team,
      created_at: new Date()
    })
  }

  changeName (name) {
    this.name = name
    this.updated_at = new Date()
  }

}

module.exports = Board
