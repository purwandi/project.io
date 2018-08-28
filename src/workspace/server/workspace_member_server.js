const express = require('express')
const { WorkspaceMember } = require('../domain')
const { Error, ServerErrorResourceNotFound } = require('./server_error')

class WorkspaceMemberServer {

  constructor (workspaceRepo, workspaceMemberRepo, router) {
    this.workspaceRepo = workspaceRepo
    this.workspaceMemberRepo = workspaceMemberRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAll.bind(this))
    this.router.post('/', this.Save.bind(this))
    this.router.delete('/:member', this.Remove.bind(this))

    return this.router
  }

  FindAll (req, res) {
    try {
      let members = this.workspaceMemberRepo.FindAllByWorkspaceUID(req.params.workspace)
      return res.json({ data: members })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Save (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let workspaceMember = WorkspaceMember.createWorkspaceMember(req.body.user_uid, workspace.UID, req.body.role)

      this.workspaceMemberRepo.Save(workspaceMember)

      return res.json({ data: workspaceMember })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Remove (req, res) {
    try {
      let workspace = this.workspaceRepo.FindByUID(req.params.workspace)
      let workspaceMember = this.workspaceMemberRepo.FindIndexByUserUIDWithWorkspaceUID(req.params.member, workspace.UID)

      if (workspaceMember.workspace_uid !== workspace.UID) throw Error(ServerErrorResourceNotFound)

      this.workspaceMemberRepo.Remove(workspaceMember)
      return res.json()
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

}

module.exports = (workspaceRepo, workspaceMemberRepo) => {
  let router = express.Router({ mergeParams: true })
  return new WorkspaceMemberServer(workspaceRepo,workspaceMemberRepo, router).mount()
}
