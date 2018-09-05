const session = require('express-session')
const uuid = require('uuid')

module.exports = session({
  genid: (req) => uuid.v4(),
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: true
})
