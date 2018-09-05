const express = require('express')
const User = require('../domain/user')

class UserServer {

  constructor (userRepo, router) {
    this.userRepo = userRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.FindAll.bind(this))
    this.router.get('/:username',this.FindByUsername.bind(this))

    return this.router
  }

  FindAll (req, res) {
    try {
      let users = this.userRepo.FindAll()
      return res.json({ data: users })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  FindByUsername (req, res) {
    try {
      let user = this.userRepo.FindByUsername(req.params.username)
      return res.json({ data: user })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async Save (req, res) {
    try {
      let user = await User.createUser(req.body.username, req.body.password)
      this.userRepo.Save(user)

      return res.json({ data: user })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  FindByUID (req, res) {
    try {
      let users = this.userRepo.FindByUID(req.params.user)
      return res.json({ data: users })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

}

module.exports = (userRepo) => {
  let router = express.Router()
  return (new UserServer(userRepo, router)).mount()
}
