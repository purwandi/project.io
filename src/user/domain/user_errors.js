const UserErrorUsernameEmptyCode = 1
const UserErrorPasswordEmptyCode = 2
const UserErrorMustBeInstanceoffUser = 3

const Error = (error) => {
  switch (error) {
    case UserErrorUsernameEmptyCode:
      return 'Username cannot be empty'
    case UserErrorPasswordEmptyCode:
      return 'Password cannot be empty'
    case UserErrorMustBeInstanceoffUser:
      return 'The user must be instance off'
    default:
      return 'Unrecognized user error code'
  }
}

module.exports = {
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  UserErrorMustBeInstanceoffUser,
  Error
}
