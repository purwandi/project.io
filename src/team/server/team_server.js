const express  = require('express')
const repository = require('./../repository/')
const Team = require('./../domain/team')

class TeamServer {

  constructor (teamRepo, boardRepo, router) {
    this.teamRepo = teamRepo
    this.boardRepo = boardRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAllTeam.bind(this))
    this.router.post('/', this.SaveTeam.bind(this))
    this.router.get('/:teamUID', this.FindTeamByID.bind(this))
    this.router.get('/:teamUID/boards', this.FindAllBoard.bind(this))
    this.router.get('/:teamUID/boards/:boardUID', this.FindBoardById.bind(this))

    return this.router
  }

  FindAllTeam (req, res) {
    try {
      return res.json({
        data: this.teamRepo.FindAll()
      })
    } catch (error) {
      return res.json({ error })
    }
  }

  SaveTeam (req, res) {
    try {
      let team = Team.createTeam(req.body.name, req.body.slug)
      this.teamRepo.Save(team)

      return res.json({ data: team })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  FindTeamByID (req, res) {
    try {
      let t = this.teamRepo.FindById(req.params.teamUID)
      return res.json({ data: t, params: req.params })
    } catch (error) {
      return res.status(500).json()
    }
  }

  FindAllBoard (req, res) {
    let team = this.teamRepo.FindById(req.params.teamUID)

    return res.json({ data: team })
  }

  FindBoardById (req, res) {
    return res.json({ params: req.params })
  }

}

const NewTeamServer = () => {
  let teamRepo = repository.NewTeamRepositoryInMemory()
  let boardRepo = repository.NewBoardRepositoryInMemory()
  let router = express.Router()

  return new TeamServer(teamRepo, boardRepo, router)
}

module.exports = {
  NewTeamServer
}
