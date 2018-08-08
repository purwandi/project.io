const chai = require('chai')
const sinon = require('sinon')
const uuid = require('uuid')
const User = require('./user')
const {
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  Error
} = require('./user_errors')

describe('User domain test', () => {
  it('should throw error if username is blank', () => {
    chai.expect(() => User.createUser(''))
      .to.throw(Error(UserErrorUsernameEmptyCode))
  })

  it('should throw error if password is blank', () => {
    chai.expect(() => User.createUser('purwandi', ''))
      .to.throw(Error(UserErrorPasswordEmptyCode))
  })

  it('should create a user', () => {
    sinon.stub(uuid, 'v4').callsFake(() => 'fake-ui-with')

    let user = User.createUser('purwandi', 'password')

    chai.expect(user)
      .to.include({
        UID: 'fake-ui-with',
        username: 'purwandi',
        password: 'password'
      })

    uuid.v4.restore() // restore function
  })

  it('can change password', () => {
    sinon.stub(uuid, 'v4').callsFake(() => '12-a23-2423')
    let user = User.createUser('purwandi', 'password')

    chai.expect(user.changePassword('pass'))
      .to.be.ok
      .to.include({
        UID: '12-a23-2423',
        password: 'pass'
      })

    uuid.v4.restore() // restore function
  })

  it('can change name', () => {
    let user = User.createUser('purwandi', 'password')
    user.changeName('Foobar')

    chai.expect(user)
      .to.be.ok
      .to.include({
        username: 'purwandi',
        password: 'password',
        name: 'Foobar'
      })
  })

  it('can change email', () => {
    let user = User.createUser('purwandi', 'password')
    user.changeEmail('foo@bar.com')

    chai.expect(user)
      .to.be.ok
      .to.include({
        username: 'purwandi',
        password: 'password',
        email: 'foo@bar.com'
      })
  })
})
