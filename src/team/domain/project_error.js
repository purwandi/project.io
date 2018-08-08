const ProjectErrorNameisNotEmpty = 1
const ProjectErrorSlugIsNotEmpty = 2
const ProjectErrorVisibilityisNotEmpty = 3
const ProjectErrorVisibilityInvalidType = 4
const ProjectErrorTeamisNotInstanceofTeam = 5

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
    case ProjectErrorTeamisNotInstanceofTeam:
      return 'The team parameter is not instance of team class'
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
  ProjectErrorTeamisNotInstanceofTeam
}
