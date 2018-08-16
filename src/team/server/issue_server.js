const express = require('express')

class IssueServer {

  constructor (issueRepo, router) {
    this.issueRepo = issueRepo
    this.router = router
  }

  mount () {
    this.router.get('/:teamUID/projects/:projectUID/issues', this.FindAll.bind(this))

    return this.router
  }

  FindAll (req, res) {
    try {
      let projectUID = req.params.projectUID
      let data = this.issueRepo.FindAllByProjectUID(projectUID)

      return res.status(200).json({ data })
    } catch (error) {
      return res.status(500).json()
    }
  }

}

const NewIssueServer = (issueRepo) => {
  return new IssueServer(issueRepo, express.Router())
}

module.exports = NewIssueServer
