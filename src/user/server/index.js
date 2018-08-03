const express = require('express')
const app = express.Router()

const router = (db) => {
  app.get('/', (req, res) => {
    res.send('i am come from user')
  })

  return app
}

module.exports = router
