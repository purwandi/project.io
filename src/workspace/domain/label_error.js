const LabelErrorWorkspaceisNotEmpty = 1
const LabelErrorNameisNotEmpty = 2
const LabelErrorColorisNotEmpty = 3

const Error = (error) => {
  switch (error) {
    case LabelErrorWorkspaceisNotEmpty:
      return 'The workspace uid is not empty'
    case LabelErrorNameisNotEmpty:
      return 'The label name is not empty'
    case LabelErrorColorisNotEmpty:
      return 'The label color is not empty'
    default:
      return 'Unrecognized label error code'
  }
}

module.exports = {
  Error,
  LabelErrorWorkspaceisNotEmpty,
  LabelErrorNameisNotEmpty,
  LabelErrorColorisNotEmpty
}
