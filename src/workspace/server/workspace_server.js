const express = require('express')
const Workspace = require('./../domain/workspace')

class WorkspaceServer {

  constructor (workspaceRepo, router) {
    this.workspaceRepo = workspaceRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAll.bind(this))
    this.router.post('/', this.Save.bind(this))
    this.router.get('/:workspace', this.FindByUID.bind(this))
    this.router.put('/:workspace', this.Update.bind(this))
    this.router.delete('/:workspace', this.Remove.bind(this))

    return this.router
  }

  FindAll (req, res) {
    try {
      return res.json({
        data: this.workspaceRepo.FindAll()
      })
    } catch (error) {
      return res.json({ error })
    }
  }

  Save (req, res) {
    try {
      let workspace = Workspace.createWorkspace(req.body.name, req.body.slug)
      this.workspaceRepo.Save(workspace)

      return res.json({ data: workspace })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  FindByUID (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)

      return res.json({ data: workspace })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  Update (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      workspace.changeName(req.body.name)

      this.workspaceRepo.Save(workspace)

      return res.json({ data: workspace })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  Remove (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      this.workspaceRepo.Remove(workspace)

      return res.json()
    } catch (error) {
      return res.status(500).json({ error })
    }

  }

}

module.exports = (workspaceRepo) => {
  let router = express.Router()
  return (new WorkspaceServer(workspaceRepo, router)).mount()
}
