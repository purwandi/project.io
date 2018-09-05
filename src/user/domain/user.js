const {
  Error,
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  UserErrorPasswordInvalidCode,
  UserErrorPasswordConfirmationNotMatchCode,
  UserErrorNameEmptyCode,
  UserErrorEmailEmptyCode
} = require('./user_errors')
const { Model } = require('objectmodel')
const uuid = require('uuid')
const bcrypt = require('bcrypt')

const UserProperty = {
  UID: String,
  name: [String],
  email: [String],
  username: String,
  password: String,
  created_at: Date,
  updated_at: [Date]
}

class User extends Model(UserProperty) {

  static async createUser (username, password) {
    if (!username) throw Error(UserErrorUsernameEmptyCode)
    if (!password) throw Error(UserErrorPasswordEmptyCode)

    return new User({
      UID: uuid.v4(),
      username: username,
      password: await bcrypt.hash(password, 10),
      created_at: new Date()
    })
  }

  async changePassword (oldPassword, newPassword, newConfirmPassword) {

    if (newPassword !== newConfirmPassword) throw Error(UserErrorPasswordConfirmationNotMatchCode)
    if (await bcrypt.compare(oldPassword, this.password) === false) throw Error(UserErrorPasswordInvalidCode)

    this.password = await bcrypt.hash(newPassword, 10)
    this.updated_at = new Date()
    return this
  }

  changeName (name) {
    if (!name) throw Error(UserErrorNameEmptyCode)

    this.name = name
    this.updated_at = new Date()
  }

  changeEmail (email) {
    if (!email) throw Error(UserErrorEmailEmptyCode)

    this.email = email
    this.updated_at = new Date()
  }

}

module.exports = User
