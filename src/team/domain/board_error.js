const BoardErrorNameisNotEmpty = 1
const BoardErrorProjectisNotEmpty  = 2

const Error = (error) => {
  switch (error) {
    case BoardErrorNameisNotEmpty:
      return 'The board name can not be empty'
    case BoardErrorProjectisNotEmpty:
      return 'The board project can not be empty'
    default:
      return 'Unrecognized board error code'
  }
}

module.exports = {
  Error,
  BoardErrorNameisNotEmpty,
  BoardErrorProjectisNotEmpty
}
