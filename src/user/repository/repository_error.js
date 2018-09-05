const RepositoryErrorIsNotInstanceOfUser = 1
const RepositoryErrorUserisNotFound = 2

const Error = (error) => {
  switch (error) {
    case RepositoryErrorIsNotInstanceOfUser:
      return 'User parameter is not instance of user class'
    case RepositoryErrorUserisNotFound:
      return 'User is not found in repository'
    default:
      return 'Unrecognized user repository error code'
  }
}

module.exports = {
  Error,
  RepositoryErrorIsNotInstanceOfUser,
  RepositoryErrorUserisNotFound
}
