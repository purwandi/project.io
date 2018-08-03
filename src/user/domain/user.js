const {
  Error,
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  UserErrorMustBeInstanceoffUser
} = require('./user_errors')
const Model = require('objectmodel')
const uuid4 = require('uuid/v4')

const User = new Model.ObjectModel({
  uid: String,
  username: String,
  password: String,
  created_at: String,
  updated_at: [String]
})

const createUser = (username, password) => {
  if (!username) {
    return Error(UserErrorUsernameEmptyCode)
  }

  if (!password) {
    return Error(UserErrorPasswordEmptyCode)
  }

  try {
    return new User({
      uid: uuid4(),
      username: username,
      password: password ,
      created_at: (new Date).toISOString()
    })
  } catch (error) {
    return error
  }
}

const changePassword = (user, password) => {
  if (user instanceof User === false) {
    return Error(UserErrorMustBeInstanceoffUser)
  }

  user.password = password
  user.updated_at = (new Date).toISOString()
  return user
}

module.exports = {
  User,
  createUser,
  changePassword
}
