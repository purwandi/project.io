const express = require('express')

class ProjectServer {

  constructor (projectRepo, router) {
    this.projectRepo = projectRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAll.bind(this))

    return this.router
  }

  FindAll (req, res) {
    try {
      let teamUID = req.params.teamUID
      let data = this.projectRepo.FindByTeamID(teamUID)

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(500).json()
    }
  }

}

module.exports = (projectRepo) => {
  let router = express.Router()
  return (new ProjectServer(projectRepo, router)).mount()
}
