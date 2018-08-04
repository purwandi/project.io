const {
  Error,
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  UserErrorMustBeInstanceoffUser
} = require('./user_errors')
const { Model } = require('objectmodel')
const uuid4 = require('uuid/v4')

const UserProperty = {
  uid: String,
  username: String,
  password: String,
  created_at: String,
  updated_at: [String]
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
      uid: uuid4(),
      username: username,
      password: password ,
      created_at: (new Date).toISOString()
    })
  }

  changePassword (password) {
    this.password = password
    this.updated_at = (new Date).toISOString()
    return this
  }
}

module.exports = User
