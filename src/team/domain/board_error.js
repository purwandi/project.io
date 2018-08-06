const BoardErrorNameisNotEmpty = 1
const BoardErrorTeamisNotEmpty  = 2
const BoardErrorTeamIsNotInstanceOfTeam = 3

const Error = (error) => {
  switch (error) {
    case BoardErrorNameisNotEmpty:
      return 'The board name can not be empty'
    case BoardErrorTeamisNotEmpty:
      return 'The board team can not be empty'
    case BoardErrorTeamIsNotInstanceOfTeam:
      return 'The board team data is not instance of Team'
    default:
      return 'Unrecognized board error code'
  }
}

module.exports = {
  Error,
  BoardErrorNameisNotEmpty,
  BoardErrorTeamisNotEmpty,
  BoardErrorTeamIsNotInstanceOfTeam
}
