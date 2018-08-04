const express  = require('express')
const app = express.Router()
const repository = require('./../repository/team_repository')
const Team = require('./../domain/team')

const NewTeamServer = () => {
  return {
    teamRepo: repository.NewTeamRepositoryInMemory()
  }
}

const TeamRouter = (TeamServer) => {
  app.get('/', (req, res) => {

    return res.json({
      data: TeamServer.teamRepo.FindAll()
    })
  })

  app.post('/', (req, res) => {
    try {
      let t = Team.createTeam(req.body.name, req.body.slug)
      TeamServer.teamRepo.Save(t)

      return res.json({ data: t })
    } catch (error) {
      return res.status(500).json({ error })
    }
  })

  return app
}

module.exports = {
  TeamRouter,
  NewTeamServer
}
