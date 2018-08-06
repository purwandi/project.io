const IssueErrorTitleisNotEmpty = 1

const Error =  (error) => {
  switch (error) {
    case IssueErrorTitleisNotEmpty:
      return 'The issue title is not empty'
    default:
      return 'Unrecognized issue error code'
  }
}

module.exports = {
  Error,
  IssueErrorTitleisNotEmpty
}
