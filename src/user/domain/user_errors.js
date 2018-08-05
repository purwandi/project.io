const UserErrorUsernameEmptyCode = 1
const UserErrorPasswordEmptyCode = 2

const Error = (error) => {
  switch (error) {
    case UserErrorUsernameEmptyCode:
      return 'Username cannot be empty'
    case UserErrorPasswordEmptyCode:
      return 'Password cannot be empty'
    default:
      return 'Unrecognized user error code'
  }
}

module.exports = {
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  Error
}
