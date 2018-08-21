const { Model } = require('objectmodel')
const uuid = require('uuid')
const {
  Error,
  BoardErrorNameisNotEmpty,
  BoardErrorProjectisNotEmpty
} = require('./board_error')

const BoardProperty = Model({
  UID: String,
  name: String,
  project_uid: String,
  created_at: Date,
  updated_at: [Date]
})

class Board extends BoardProperty {

  static createBoard (projectUID, name) {

    if (!projectUID) throw Error(BoardErrorProjectisNotEmpty)
    if (!name) throw Error(BoardErrorNameisNotEmpty)

    return new Board({
      UID: uuid.v4(),
      name: name,
      project_uid: projectUID,
      created_at: new Date()
    })
  }

  changeName (name) {
    this.name = name
    this.updated_at = new Date()
  }

}

module.exports = Board
