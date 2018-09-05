const express = require('express')
const AuthMattermost = require('../domain/auth_mattermost')

const Mattermost = new AuthMattermost({
  clientId: process.env.MATTERMOST_CLIENTID,
  clientSecret: process.env.MATTERMOST_SECRET,
  apiUrl: process.env.MATTERMOST_URL + '/api/v4',
  accessTokenUri: process.env.MATTERMOST_URL + '/oauth/access_token',
  authorizationUri: process.env.MATTERMOST_URL + '/oauth/authorize',
  redirectUri: 'http://localhost:3000/auth/mattermost/callback'
})

class MattermostServer {

  constructor (userRepo, router) {
    this.userRepo = userRepo
    this.router = router
  }

  mount () {
    this.router.get('/', this.Redirector.bind(this))
    this.router.get('/callback',this.Callback.bind(this))

    return this.router
  }

  Redirector (req, res) {
    return res.redirect(Mattermost.authorize())
  }

  Callback (req, res) {
    const cbSuccess = () => {
      Mattermost.getUser(user =>  {
        // check existing user by email

        // force set session user_uid

        // console.log(user.username)
      }, error => {
        return res.status(400).json({ error })
      })
      return res.json()
    }

    const cbError = (response) => {
      return res.json()
    }

    Mattermost.getToken(req.originalUrl, cbSuccess, cbError)
  }

}

module.exports = (userRepo) => {
  let router = express.Router({ mergeParams: true })
  return new MattermostServer(userRepo, router).mount()
}

