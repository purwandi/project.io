const express = require('express')

class SprintServer {

  constructor (sprintRepo, router) {
    this.sprintRepo = sprintRepo
    this.router = router
  }

  mount () {
    this.router.get('/:teamUID/projects/projectUID/sprints', this.FindAll.bind(this))

    return this.router
  }

  FindAll (req, res) {
    return res.json({})
  }

}

module.exports = (sprintRepo) => {
  let router = express.Router()
  return (new SprintServer(sprintRepo, router)).mount()
}
