const express = require('express')
const { User } = require('../domain')

class RegisterServer {

  constructor (userRepo, router) {
    this.userRepo = userRepo
    this.router = router
  }

  mount () {
    this.router.post('/signin', this.Login.bind(this))
    this.router.post('/signup', this.Register.bind(this))
    this.router.get('/signout', this.Logout.bind(this))

    this.router.use('/mattermost', require('./auth_mattermost_server')(this.userRepo))

    return this.router
  }

  Login (req, res) {
    let username = req.body.username
    let email = req.body.email

    const response = (user) => {
      if (user) {
        req.session.user_uid = user.UID
        return res.json({ data: user })
      } else {
        return res.status(400).json({ error: 'Invalid credentials' })
      }
    }

    if (username) {
      return response(this.userRepo.FindByUsername(username))
    } else if (email) {
      return response(this.userRepo.FindByEmail(email))
    } else {
      return res.status(400).json({ error: 'Credential is can not be empty' })
    }
  }

  async Register (req, res) {
    try {
      let user = await User.createUser(req.body.username, req.body.password)
      user.changeEmail(req.body.email)
      user.changeName(req.body.name)

      if (this.userRepo.isExist(user)) throw 'User already exist'

      // save into repository
      this.userRepo.Save(user)

      // save user session
      req.session.user_uid = user.UID

      return res.json({ data: user })
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  }

  Logout (req, res) {
    try {
      if (req.session.user_uid) {
        req.session.user_uid = null
        return res.json({})
      }
      throw 'Error you need to signin to access this page'
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

}

module.exports = (userRepo) => {
  let router = express.Router({ mergeParams: true })
  return new RegisterServer(userRepo, router).mount()
}
