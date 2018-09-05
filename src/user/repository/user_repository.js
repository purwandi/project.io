'use strict'

const User = require('./../domain/user')
const {
  Error,
  RepositoryErrorIsNotInstanceOfUser,
  RepositoryErrorUserisNotFound
} = require('./repository_error')

class UserRepositoryInMemory {

  constructor (users) {
    this.userMap = users || []
  }

  static init (userMap) {
    return new UserRepositoryInMemory(userMap)
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

  FindByUID (uid) {
    let user = this.userMap.find(item => item.UID === uid)

    if (!user) throw Error(RepositoryErrorUserisNotFound)

    return user
  }

  FindByEmail (email) {
    return this.userMap.find(item => item.email === email)
  }

  FindByUsername (username) {
    return this.userMap.find(item => item.username === username)
  }

  FindIndex (User) {
    return this.userMap.findIndex(item => item.UID === User.UID)
  }

  isExist (username, email) {
    return this.FindByUsername(username) || this.FindByEmail(email)
  }

}

module.exports = UserRepositoryInMemory
