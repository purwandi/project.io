const express = require('express')
const router = express.Router()

module.exports = (persistence) => {

  router.use('/', require('./workspace_server')(persistence.workspaceRepo))
  router.use('/:workspace/members', require('./workspace_member_server')(persistence.workspaceRepo, persistence.workspaceMemberRepo))
  router.use('/:workspace/labels', require('./label_server')(persistence.workspaceRepo, persistence.labelRepo))
  router.use('/:workspace/projects', require('./project_server')(persistence.workspaceRepo, persistence.projectRepo))
  router.use('/:workspace/projects/:project/issues', require('./issue_server')(persistence.projectRepo, persistence.issueRepo))
  router.use('/:workspace/projects/:project/sprints', require('./sprint_server')(persistence.projectRepo, persistence.sprintRepo))

  return router
}
