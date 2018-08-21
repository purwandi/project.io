const IssueErrorTitleisNotEmpty = 1
const IssueErrorProjectIsNotEmpty = 2
const IssueErrorUserIsNotEmpty = 3

const Error = (error) => {
  switch (error) {
    case IssueErrorTitleisNotEmpty:
      return 'The issue title is not empty'
    case IssueErrorProjectIsNotEmpty:
      return 'The project paramater is not empty'
    case IssueErrorUserIsNotEmpty:
      return 'The created_by issue is not empty'
    default:
      return 'Unrecognized issue error code'
  }
}

module.exports = {
  Error,
  IssueErrorTitleisNotEmpty,
  IssueErrorProjectIsNotEmpty,
  IssueErrorUserIsNotEmpty
}
