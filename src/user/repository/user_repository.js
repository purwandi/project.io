'use strict'

class UserRepository {

  constructor (users) {
    this.userMap = users || []
  }

  Save (user) {
    this.userMap.push(user)
  }

  FindAll () {
    return this.userMap
  }

  Find (uid) {
    this.userMap.find(data => data.UID === uid)
  }

}

const NewUserRepositoryInMemory = () => {
  return new UserRepository()
}

module.exports = {
  UserRepository,
  NewUserRepositoryInMemory
}
