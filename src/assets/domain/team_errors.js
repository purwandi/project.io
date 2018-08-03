const TeamErrorNameisNotEmpty = 1
const TeamErrorSlugisNotEmpty = 2
const TeamErrorSlugIsNotValid = 3

const Error = (error) => {
  switch (error) {
    case TeamErrorNameisNotEmpty:
      return 'Team name cannot be empty'
    case TeamErrorSlugisNotEmpty:
      return 'Team slug cannot be empty'
    case TeamErrorSlugIsNotValid:
      return 'Team slug is not valid url friendly'
    default:
      return 'Unrecognized team error code'
  }
}

module.exports = {
  TeamErrorNameisNotEmpty,
  TeamErrorSlugisNotEmpty,
  TeamErrorSlugIsNotValid,
  Error
}
