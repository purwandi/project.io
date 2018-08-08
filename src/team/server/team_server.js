const express  = require('express')
const repository = require('./../repository/')
const Team = require('./../domain/team')
const Board = require('./../domain/board')

class TeamServer {

  constructor (teamRepo, boardRepo, issueRepo, router) {
    this.teamRepo = teamRepo
    this.boardRepo = boardRepo
    this.issueRepo = issueRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAllTeam.bind(this))
    this.router.post('/', this.SaveTeam.bind(this))
    this.router.get('/:teamUID', this.FindTeamByID.bind(this))
    this.router.get('/:teamUID/boards', this.FindAllBoard.bind(this))
    this.router.post('/:teamUID/boards', this.SaveBoard.bind(this))
    this.router.get('/:teamUID/boards/:boardUID', this.FindBoardById.bind(this))
    this.router.get('/:teamUID/boards/:boardUID/issues', this.FindAllIssue.bind(this))
    this.router.post('/:teamUID/boards/:boardUID/issues', this.SaveIssue.bind(this))
    this.router.get('/:teamUID/boards/:boardUID/issues/:issueUID', this.GetIssue.bind(this))

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

  SaveBoard (req, res) {
    try {
      let team = this.teamRepo.FindById(req.params.teamUID)
      let board = Board.createBoard(team, req.params.name)

      this.boardRepo.Save(board)

      return res.json({ data: board })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  FindBoardById (req, res) {
    try {
      let team = this.teamRepo.FindById(req.params.teamUID)
      let board = this.boardRepo.FindById(req.params.boardUID)

      return res.json({ data: board })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  FindAllIssue (req, res) {

  }

  SaveIssue (req, res) {

  }

  GetIssue (req, res) {

  }

}

const NewTeamServer = () => {
  let teamRepo = repository.NewTeamRepositoryInMemory()
  let boardRepo = repository.NewBoardRepositoryInMemory()
  let issueRepo = repository.NewIssueRepisitoryInMemory()
  let router = express.Router()

  return new TeamServer(teamRepo, boardRepo, issueRepo, router)
}

module.exports = {
  NewTeamServer
}
