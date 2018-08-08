const IssueErrorTitleisNotEmpty = 1
const IssueErrorBoardIsNotEmpty = 2

const Error =  (error) => {
  switch (error) {
    case IssueErrorTitleisNotEmpty:
      return 'The issue title is not empty'
    case IssueErrorBoardIsNotEmpty:
      return 'The board paramater is not empty'
    default:
      return 'Unrecognized issue error code'
  }
}

module.exports = {
  Error,
  IssueErrorTitleisNotEmpty,
  IssueErrorBoardIsNotEmpty
}
