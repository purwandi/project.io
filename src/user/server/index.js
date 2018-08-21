const express = require('express')
const router = express.Router()

module.exports = (persistence) => {

  router.use('/', require('./user_server')(persistence.userRepo))

  return router
}
