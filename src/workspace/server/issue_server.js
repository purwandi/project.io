const express = require('express')
const { Issue } = require('./../domain')
const { Error, ServerErrorResourceNotFound } = require('./server_error')

class IssueServer {

  constructor (projectRepo, issueRepo, router) {
    this.projectRepo = projectRepo
    this.issueRepo = issueRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAll.bind(this))
    this.router.post('/', this.Save.bind(this))
    this.router.get('/:issue', this.FindByUID.bind(this))
    this.router.put('/:issue', this.Update.bind(this))
    this.router.delete('/:issue', this.Remove.bind(this))

    return this.router
  }

  FindAll (req, res) {
    try {
      let data = this.issueRepo.FindAllByProjectUID(req.params.project)

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(400).json()
    }
  }

  Save (req,res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let issue = Issue.createIssue(project.UID, 'f122-d122', req.body.title, req.body.body)

      this.issueRepo.Save(issue)

      return res.json({ data: issue })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  FindByUID (req,res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let issue = this.issueRepo.FindByUID(req.params.issue)

      if (issue.project_uid !== project.UID) throw Error(ServerErrorResourceNotFound)

      return res.json({ data: issue })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Update (req, res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let issue = this.issueRepo.FindByUID(req.params.issue)

      if (issue.project_uid !== project.UID) throw Error(ServerErrorResourceNotFound)

      issue.changeTitle(req.body.title)
      issue.changeBody(req.body.body)

      this.issueRepo.Save(issue)

      return res.json({ data: issue })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  Remove (req, res) {
    try {
      let project = this.projectRepo.FindByUID(req.params.project)
      let issue = this.issueRepo.FindByUID(req.params.issue)

      if (issue.project_uid !== project.UID) throw Error(ServerErrorResourceNotFound)

      this.issueRepo.Remove(issue)
      return res.json()
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

}

module.exports = (projectRepo, issueRepo) => {
  let router = express.Router({ mergeParams: true })
  return new IssueServer(projectRepo, issueRepo, router).mount()
}
