const RepositoryErrorIsNotInstanceOfUser = 1

const Error = (error) => {
  switch (error) {
    case RepositoryErrorIsNotInstanceOfUser:
      return 'User parameter is not instance of user class'
    default:
      return 'Unrecognized user repository error code'
  }
}

module.exports = {
  Error,
  RepositoryErrorIsNotInstanceOfUser
}
