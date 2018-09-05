const express = require('express')
const router = express.Router()

module.exports = (persistence) => {

  router.use('/', require('./auth_server')(persistence.userRepo))
  router.use('/mattermost', require('./mattermost_server')(persistence.userRepo))

  return router
}
