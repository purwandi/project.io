const express = require('express')
const router = express.Router()

const UserRouter = (persistence) => {

  router.use('/', require('./user_server')(persistence.userRepo))

  return router
}

module.exports = UserRouter
