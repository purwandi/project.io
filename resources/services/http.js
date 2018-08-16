import axios from 'axios'
import qs from 'qs'

export default {
  request (method, url, data, successCb = null, errorCb = null, headers = {}) {
    // NProgress.start()
    axios.request({
      url,
      data: data instanceof FormData ? data : qs.stringify(data),
      method,
      headers: Object.assign({}, {
        'Content-Type': 'application/json'
      }, headers)
    }).then(successCb).catch(errorCb)
  },

  get (url, successCb = null, errorCb = null) {
    return this.request('get', url, {}, successCb, errorCb)
  },

  post (url, data, successCb = null, errorCb = null, headers = {}) {
    return this.request('post', url, data, successCb, errorCb, headers)
  },

  put (url, data, successCb = null, errorCb = null) {
    return this.request('put', url, data, successCb, errorCb)
  },

  delete (url, data = {}, successCb = null, errorCb = null) {
    return this.request('delete', url, data, successCb, errorCb)
  },

  init () {
    axios.defaults.baseURL = '//' + process.env.APP_HOST + ':' + process.env.APP_PORT + '/'

    // Intercept the request to make sure the token is injected into the header.
    axios.interceptors.request.use(config => {
      // we intercept axios request and add authorizatio header before perform send a request to the server
      // config.headers.Authorization = `Bearer ${ls.get('jwt-token')}`
      return config
    })

    // Intercept the response and…
    // axios.interceptors.response.use(response => {
    //   // NProgress.done()

    //   // …get the token from the header or response data if exists, and save it.
    //   // const token = response.headers['Authorization'] || response.data['token']
    //   // token && ls.set('jwt-token', token)

    //   return response
    // }, error => {
    //   // NProgress.done()
    //   // Also, if we receive a Bad Request / Unauthorized error
    //   if (error.response.status === 400 || error.response.status === 401) {

    //   }

    //   return Promise.reject(error)
    // })
  }
}
