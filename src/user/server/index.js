const express = require('express')
const router = express.Router()

module.exports = (persistence) => {

  router.use('/users', require('./user_server')(persistence.userRepo))
  router.use('/auth', require('./auth_server')(persistence.userRepo))
  router.use('/me', require('./profile_server')(persistence.userRepo))

  return router
}
