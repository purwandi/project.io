const express = require('express')
const router = express.Router()

module.exports = (persistence) => {

  router.use('/', require('./workspace_server')(persistence.workspaceRepo))
  router.use('/:workspace/projects', require('./project_server')(persistence.projectRepo))
  router.use('/:workspace/projects/:project/issues', require('./issue_server')(persistence.issueRepo))
  router.use('/:workspace/projects/:project/sprints', require('./sprint_server')(persistence.sprintRepo))

  return router
}
