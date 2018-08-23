const ServerErrorResourceNotFound = 1

const Error = (error) => {
  switch (error) {
    case ServerErrorResourceNotFound:
      return 'Server error, resources is not found'
    default:
      return 'Unrecognized server error code'
  }
}

module.exports = {
  Error,
  ServerErrorResourceNotFound
}
