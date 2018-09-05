const UserErrorUsernameEmptyCode = 1
const UserErrorPasswordEmptyCode = 2
const UserErrorPasswordInvalidCode = 3
const UserErrorPasswordConfirmationNotMatchCode = 4
const UserErrorNameEmptyCode = 5
const UserErrorEmailEmptyCode = 6

const Error = (error) => {
  switch (error) {
    case UserErrorUsernameEmptyCode:
      return 'Username cannot be empty'
    case UserErrorPasswordEmptyCode:
      return 'Password cannot be empty'
    case UserErrorPasswordInvalidCode:
      return 'Current password is invalid'
    case UserErrorPasswordConfirmationNotMatchCode:
      return 'Password confirmation is not match with new password'
    case UserErrorNameEmptyCode:
      return 'Name can bot be empty'
    case UserErrorEmailEmptyCode:
      return 'Email can not be empty'
    default:
      return 'Unrecognized user error code'
  }
}

module.exports = {
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  UserErrorPasswordInvalidCode,
  UserErrorPasswordConfirmationNotMatchCode,
  UserErrorNameEmptyCode,
  UserErrorEmailEmptyCode,
  Error
}
