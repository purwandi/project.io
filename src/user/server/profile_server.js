const express = require('express')

class ProfileServer {

  constructor (userRepo, router) {
    this.userRepo = userRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.Profile.bind(this))
    this.router.put('/', this.Update.bind(this))
    this.router.put('/change-password', this.ChangePassword.bind(this))

    return this.router
  }

  Profile (req, res) {
    try {
      let user = this.userRepo.FindByUID(req.session.user_uid)
      return res.json({ data: user })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }


  Update (req, res) {
    try {
      let user = this.userRepo.FindByUID(req.params.user)

      user.changeName(req.body.name)
      user.changeEmail(req.body.email)

      this.userRepo.Save(user)

      return res.json({ data: user })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

  async ChangePassword (req, res) {
    try {
      let user = this.userRepo.FindByUID(req.params.user)

      await user.changePassword(req.body.password, req.body.newPassword, req.body.newConfirmPassword)
      this.userRepo.Save(user)

      return res.json({ data: user })
    } catch (error) {
      return res.status(400).json({ error })
    }
  }

}

module.exports = (userRepo) => {
  let router = express.Router()
  return new ProfileServer(userRepo, router).mount()
}
