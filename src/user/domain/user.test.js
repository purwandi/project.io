const assert = require('assert')
const { User, createUser, changePassword } = require('./user')
const {
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  Error
} = require('./user_errors')

describe('User domain test', () => {
  it('should throw error if username is blank', () => {
    let error = createUser('')
    assert.equal(error, Error(UserErrorUsernameEmptyCode))
  })

  it('should throw error if password is blank', () => {
    let error = createUser('purwandi', '')
    assert.equal(error, Error(UserErrorPasswordEmptyCode))
  })

  it('should create a user', () => {
    let status = createUser('purwandi', 'password')
    assert.equal(true, status instanceof User)
  })

  it('can change password', () => {
    let userData = createUser('purwandi', 'password')
    let status = changePassword(userData, 'neki')

    assert.equal(true, status instanceof User)
    assert.equal('neki', status.password)
  })
})
