const queryString = require('query-string')
const axios = require('axios')
const Url = require('url')

class AuthMattermost {

  constructor (config) {
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
    this.accessTokenUri = config.accessTokenUri
    this.authorizationUri = config.authorizationUri
    this.redirectUri = config.redirectUri
    this.access_token = null
    this.refresh_token = null
    this.apiUrl = config.apiUrl
  }

  authorize () {
    return this.authorizationUri + '?' + queryString.stringify(
      Object.assign({}, {
        client_id : this.clientId,
        redirect_uri: this.redirectUri,
        scope: null,
        response_type: 'code',
        state: null
      })
    )
  }

  getToken (uri, callback, error) {
    let url = Url.parse(uri)
    let data = typeof url.query === 'string' ? queryString.parse(url.query) : (url.query || {})

    axios.post(this.accessTokenUri, queryString.stringify({
      client_id : this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      code: data.code,
      redirect_uri: this.redirectUri
    }))
    .then(({ data }) => {
      this.access_token = data.access_token
      this.refresh_token = data.refresh_token
      callback(data)
    })
    .catch(error)
  }

  getUser (callback, error) {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.access_token
      }
    }

    axios.get(this.apiUrl + '/users/me', config)
      .then(({ data }) => callback(data))
      .catch(error)
  }

  refreshToken (callback, error) {
    axios.post(this.accessTokenUri, queryString.stringify({
      client_id : this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: this.refresh_token
    }))
    .then(({ data }) => {
      this.access_token = data.access_token
      this.refresh_token = data.refresh_token
      callback(data)
    })
    .catch(error)
  }

}

module.exports = AuthMattermost
