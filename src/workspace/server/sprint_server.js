const express = require('express')
const { Sprint } = require('./../domain')
const { Error, ServerErrorResourceNotFound } = require('./server_error')

class SprintServer {

  constructor (projectRepo, sprintRepo, router) {
    this.projectRepo = projectRepo
    this.sprintRepo = sprintRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAll.bind(this))
    this.router.post('/', this.Save.bind(this))
    this.router.get('/:sprint', this.FindByUID.bind(this))
    this.router.put('/:sprint', this.Update.bind(this))
    this.router.put('/:sprint/start', this.Start.bind(this))
    this.router.put('/:sprint/close', this.Close.bind(this))
    this.router.delete('/:sprint', this.Remove.bind(this))

    return this.router
  }

  FindAll (req, res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let sprints = this.sprintRepo.FindAllByProjectUID(project.UID)
      return res.json({ data: sprints })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Save (req, res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let sprint = Sprint.createSprint(project.UID, req.body.name)

      this.sprintRepo.Save(sprint)

      return res.json({ data: sprint })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  FindByUID (req, res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let sprint = this.sprintRepo.FindByUID(req.params.sprint)

      if (sprint.project_uid !== project.UID) throw Error(ServerErrorResourceNotFound)

      return res.json({ data: sprint })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Update (req, res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let sprint = this.sprintRepo.FindByUID(req.params.sprint)

      if (sprint.project_uid !== project.UID) throw Error(ServerErrorResourceNotFound)

      sprint.changeName(req.body.name)

      this.sprintRepo.Save(sprint)

      return res.json({ data: sprint })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Start (req, res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let sprint = this.sprintRepo.FindByUID(req.params.sprint)

      if (sprint.project_uid !== project.UID) throw Error(ServerErrorResourceNotFound)

      sprint.start()

      this.sprintRepo.Save(sprint)

      return res.json({ data: sprint })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Close (req, res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let sprint = this.sprintRepo.FindByUID(req.params.sprint)

      if (sprint.project_uid !== project.UID) throw Error(ServerErrorResourceNotFound)

      sprint.closed()

      this.sprintRepo.Save(sprint)

      return res.json({ data: sprint })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Remove (req, res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let sprint = this.sprintRepo.FindByUID(req.params.sprint)

      if (sprint.project_uid !== project.UID) throw Error(ServerErrorResourceNotFound)

      this.sprintRepo.Remove(sprint)

      return res.json({ })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

}

module.exports = (projectRepo, sprintRepo) => {
  let router = express.Router({ mergeParams:true })
  return new SprintServer(projectRepo, sprintRepo, router).mount()
}
