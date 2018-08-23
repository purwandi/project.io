const express = require('express')
const { Project } = require('./../domain')

class ProjectServer {

  constructor (workspaceRepo, projectRepo, router) {
    this.workspaceRepo = workspaceRepo
    this.projectRepo = projectRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAll.bind(this))
    this.router.post('/', this.Save.bind(this))
    this.router.get('/:project', this.FindByUID.bind(this))
    this.router.put('/:project', this.Update.bind(this))
    this.router.delete('/:project', this.Remove.bind(this))

    return this.router
  }

  FindAll (req, res) {
    try {
      let data = this.projectRepo.FindByWorkspaceUID(req.params.workspace)

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(500).json()
    }
  }

  Save (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let project = Project.createProject(workspace.UID, req.params.name, req.params.slug, req.params.visibility)

      this.projectRepo.Save(project)

      return res.json({ data: project })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  FindByUID (req, res) {

  }

  Update (req, res) {

  }

  Remove (req, res) {

  }

}

module.exports = (workspaceRepo, projectRepo) => {
  let router = express.Router()
  return (new ProjectServer(workspaceRepo, projectRepo, router)).mount()
}
