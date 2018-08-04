const assert = require('assert')
const expect = require('chai').expect
const User = require('./user')
const {
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  Error
} = require('./user_errors')

describe('User domain test', () => {
  it('should throw error if username is blank', () => {
    expect(() => User.createUser(''))
      .to.throw(Error(UserErrorUsernameEmptyCode))
  })

  it('should throw error if password is blank', () => {
    expect(() => User.createUser('purwandi', ''))
      .to.throw(Error(UserErrorPasswordEmptyCode))
  })

  it('should create a user', () => {
    let status = User.createUser('purwandi', 'password')
    assert.equal(true, status instanceof User)
  })

  it('can change password', () => {
    let user = User.createUser('purwandi', 'password')
    let status = user.changePassword('neki')

    assert.equal('neki', status.password)
  })
})
