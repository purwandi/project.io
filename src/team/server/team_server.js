const express  = require('express')
const repository = require('./../repository/team_repository')
const Team = require('./../domain/team')

class TeamServer {

  constructor (teamRepo, router) {
    this.teamRepo = teamRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAll.bind(this))
    this.router.post('/', this.Save.bind(this))

    return this.router
  }

  FindAll (req, res) {

    return res.json({
      data: this.teamRepo.FindAll()
    })
  }

  Save (req, res) {
    try {
      let team = Team.createTeam(req.body.name, req.body.slug)
      this.teamRepo.Save(team)

      return res.json({ data: team })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

}

const NewTeamServer = () => {
  let teamRepo = repository.NewTeamRepositoryInMemory()
  let router = express.Router()

  return new TeamServer(teamRepo, router)
}

module.exports = {
  NewTeamServer
}
