const express = require('express')
const { Project } = require('./../domain')
const { Error, ServerErrorResourceNotFound } = require('./server_error')

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
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let data = this.projectRepo.FindByWorkspaceUID(workspace.UID)
      return res.status(200).json({ data })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Save (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let project = Project.createProject(workspace.UID, req.body.name, req.body.slug, req.body.visibility)

      this.projectRepo.Save(project)

      return res.json({ data: project })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  FindByUID (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let project = this.projectRepo.FindByUID(req.params.project)

      if (project.workspace_uid !== workspace.UID) throw Error(ServerErrorResourceNotFound)

      return res.json({ data: project })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Update (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let project = this.projectRepo.FindByUID(req.params.project)

      if (project.workspace_uid !== workspace.UID) throw Error(ServerErrorResourceNotFound)

      project.changeName(req.body.name)
      project.changeVisibility(req.body.visibility)

      return res.json({ data: project })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Remove (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let project = this.projectRepo.FindByUID(req.params.project)

      if (project.workspace_uid !== workspace.UID) throw Error(ServerErrorResourceNotFound)

      this.projectRepo.Remove(project)

      return res.json()
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

}

module.exports = (workspaceRepo, projectRepo) => {
  let router = express.Router({ mergeParams: true })
  return (new ProjectServer(workspaceRepo, projectRepo, router)).mount()
}
