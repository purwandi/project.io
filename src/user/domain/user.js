const {
  Error,
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode
} = require('./user_errors')
const { Model } = require('objectmodel')
const uuid = require('uuid')

const UserProperty = {
  UID: String,
  username: String,
  password: String,
  created_at: Date,
  updated_at: [Date]
}

class User extends Model(UserProperty) {

  static createUser (username, password) {
    if (!username) {
      throw Error(UserErrorUsernameEmptyCode)
    }

    if (!password) {
      throw Error(UserErrorPasswordEmptyCode)
    }

    return new User({
      UID: uuid.v4(),
      username: username,
      password: password,
      created_at: new Date()
    })
  }

  changePassword (password) {
    this.password = password
    this.updated_at = new Date()
    return this
  }

}

module.exports = User
