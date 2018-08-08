const ProjectErrorNameisNotEmpty = 1
const ProjectErrorSlugIsNotEmpty = 2
const ProjectErrorVisibilityisNotEmpty = 3
const ProjectErrorVisibilityInvalidType = 4
const ProjectErrorTeamisNotEmpty = 5

const Error = (error) => {
  switch (error) {
    case ProjectErrorNameisNotEmpty:
      return 'The project name is not empty'
    case ProjectErrorSlugIsNotEmpty:
      return 'The project slug is not empty'
    case ProjectErrorVisibilityisNotEmpty:
      return 'The project visibility is not empty'
    case ProjectErrorVisibilityInvalidType:
      return 'Visibility should be private or public'
    case ProjectErrorTeamisNotEmpty:
      return 'The project name is not empty'
    default:
      return 'Unrecognized project error code'
  }
}

module.exports = {
  Error,
  ProjectErrorNameisNotEmpty,
  ProjectErrorSlugIsNotEmpty,
  ProjectErrorVisibilityisNotEmpty,
  ProjectErrorVisibilityInvalidType,
  ProjectErrorTeamisNotEmpty
}
