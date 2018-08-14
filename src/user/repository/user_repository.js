'use strict'

const User = require('./../domain/user')
const { Error, RepositoryErrorIsNotInstanceOfUser } = require('./repository_error')

class UserRepository {

  constructor (users) {
    this.userMap = users || []
  }

  static init (userMap) {
    return new UserRepository(userMap)
  }

  Save (user) {
    if (user instanceof User === false) {
      throw Error(RepositoryErrorIsNotInstanceOfUser)
    }

    let index = this.FindIndex(user)

    if (index > -1) {
      this.userMap[index] = user
    } else {
      this.userMap.push(user)
    }
  }

  FindAll () {
    return this.userMap
  }

  FindById (uid) {
    return this.userMap.find(data => data.UID === uid)
  }

  FindIndex (User) {
    return this.userMap.findIndex(item => item.UID === User.UID)
  }

}

module.exports = UserRepository
