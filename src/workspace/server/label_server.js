const express = require('express')
const { Label } = require('./../domain')
const { Error, ServerErrorResourceNotFound } = require('./server_error')

class LabelServer {

  constructor (workspaceRepo, labelRepo, router) {
    this.workspaceRepo = workspaceRepo
    this.labelRepo = labelRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAll.bind(this))
    this.router.post('/', this.Save.bind(this))
    this.router.get('/:label', this.FindByUID.bind(this))
    this.router.put('/:label',this.Update.bind(this))
    this.router.delete('/:label', this.Remove.bind(this))

    return this.router
  }

  FindAll (req, res) {
    try {
      let labels = this.labelRepo.FindByWorkspaceUID(req.params.workspace)

      return res.json({ data: labels })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  Save (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let label = Label.createLabel(workspace.UID, req.body.name,req.body.color)

      this.labelRepo.Save(label)

      return res.json({ data: label })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  FindByUID (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let label = this.labelRepo.FindByUID(req.params.label)

      if (label.workspace_uid !== workspace.UID) throw Error(ServerErrorResourceNotFound)

      return res.json({ data: label })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  Update (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let label = this.labelRepo.FindByUID(req.params.label)

      if (label.workspace_uid !== workspace.UID) throw Error(ServerErrorResourceNotFound)

      label.changeName(req.body.name)
      label.changeColor(req.body.color)

      this.labelRepo.Save(label)

      return res.json({ data: label })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  Remove (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let label = this.labelRepo.FindByUID(req.params.label)

      if (label.workspace_uid !== workspace.UID) throw Error(ServerErrorResourceNotFound)

      this.labelRepo.Remove(label)

      return res.json()
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

}

module.exports = (workspaceRepo, labelRepo) => {
  let router = express.Router({ mergeParams: true })
  return new LabelServer(workspaceRepo, labelRepo, router).mount()
}
