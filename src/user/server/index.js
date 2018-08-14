const express = require('express')
const User = require('./../domain/user')

class UserServer {

  constructor (userRepo, router) {
    this.userRepo = userRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.findAll.bind(this))
    this.router.post('/', this.store.bind(this))

    return this.router
  }

  findAll (req, res) {
    return res.json({
      data: this.userRepo.FindAll()
    })
  }

  store (req, res) {
    try {
      let user = User.createUser(req.body.username, req.body.password)
      this.userRepo.Save(user)

      return res.json({ data: user })
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

}

const NewUserServer = (userRepo) => {
  let router = express.Router()

  return new UserServer(userRepo, router)
}

module.exports = {
  NewUserServer
}
