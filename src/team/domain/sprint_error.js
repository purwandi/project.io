const SprintErrorProjectisNotEmpty = 1
const SprintErrorNameisNotEmpty = 2

const Error = (error) => {
  switch (error) {
    case SprintErrorProjectisNotEmpty:
      return 'The project id is not empty'
    case SprintErrorNameisNotEmpty:
      return 'The sprint name is not empty'
    default:
      return 'Unrecognized sprint error code'
  }
}

module.exports = {
  Error,
  SprintErrorProjectisNotEmpty,
  SprintErrorNameisNotEmpty
}
