const chai = require('chai')
const sinon = require('sinon')
const uuid = require('uuid')
const bcrypt = require('bcrypt')
const User = require('./user')
const {
  Error,
  UserErrorUsernameEmptyCode,
  UserErrorPasswordEmptyCode,
  UserErrorPasswordInvalidCode,
  UserErrorPasswordConfirmationNotMatchCode,
} = require('./user_errors')

chai.use(require('chai-as-promised'))

describe('User domain test', async () => {
  it('should throw error if username is blank', () => {
    chai.expect(User.createUser(''))
      .to.be.rejectedWith(Error(UserErrorUsernameEmptyCode))
  })

  it('should throw error if password is blank', () => {
    chai.expect(User.createUser('purwandi', ''))
      .to.be.rejectedWith(Error(UserErrorPasswordEmptyCode))
  })

  it('should create a user', async () => {
    sinon.stub(uuid, 'v4').callsFake(() => 'fake-ui-with')
    sinon.stub(bcrypt, 'hash').callsFake(() => '$2b$10$oJlupa59McDw7ahH.s8kGumDApl3xHaGa8GfcEK0w0ZXUynY0LZNu')

    let user = await User.createUser('purwandi', 'password')

    chai.expect(user)
      .to.include({
        UID: 'fake-ui-with',
        username: 'purwandi',
        password: '$2b$10$oJlupa59McDw7ahH.s8kGumDApl3xHaGa8GfcEK0w0ZXUynY0LZNu'
      })

    bcrypt.hash.restore()
    uuid.v4.restore() // restore function
  })

  it('can change password', async () => {
    sinon.stub(uuid, 'v4').callsFake(() => '12-a23-2423')
    let user = await User.createUser('purwandi', 'password')

    sinon.stub(bcrypt, 'hash').callsFake(() => '$2b$10$oJlupa59McDw7ahH.s8kGumDApl3xHaGa8GfcEK0w0ZXUynY0LZNu')

    chai.expect(await user.changePassword('password', 'new-password', 'new-password'))
      .to.be.ok
      .to.include({
        UID: '12-a23-2423',
        password: '$2b$10$oJlupa59McDw7ahH.s8kGumDApl3xHaGa8GfcEK0w0ZXUynY0LZNu'
      })

    bcrypt.hash.restore()
    uuid.v4.restore() // restore function
  })

  it('should throw error when change password', async () => {
    sinon.stub(uuid, 'v4').callsFake(() => '12-a23-2423')
    let user = await User.createUser('purwandi', 'password')

    chai.expect(user.changePassword('se', 'new-password', 'new-password'))
      .to.be.rejectedWith(Error(UserErrorPasswordInvalidCode))

    chai.expect(user.changePassword('password', 'new-password', 'new-pass'))
      .to.be.rejectedWith(Error(UserErrorPasswordConfirmationNotMatchCode))
    uuid.v4.restore()
  })

  it('can change name', async () => {
    sinon.stub(bcrypt, 'hash').callsFake(() => '$2b$10$oJlupa59McDw7ahH.s8kGumDApl3xHaGa8GfcEK0w0ZXUynY0LZNu')

    let user = await User.createUser('purwandi', 'password')
    user.changeName('Foobar')

    chai.expect(user)
      .to.be.ok
      .to.include({
        username: 'purwandi',
        password: '$2b$10$oJlupa59McDw7ahH.s8kGumDApl3xHaGa8GfcEK0w0ZXUynY0LZNu',
        name: 'Foobar'
      })
    bcrypt.hash.restore()
  })

  it('can change email', async () => {
    sinon.stub(bcrypt, 'hash').callsFake(() => '$2b$10$oJlupa59McDw7ahH.s8kGumDApl3xHaGa8GfcEK0w0ZXUynY0LZNu')
    let user = await User.createUser('purwandi', 'password')
    user.changeEmail('foo@bar.com')

    chai.expect(user)
      .to.be.ok
      .to.include({
        username: 'purwandi',
        password: '$2b$10$oJlupa59McDw7ahH.s8kGumDApl3xHaGa8GfcEK0w0ZXUynY0LZNu',
        email: 'foo@bar.com'
      })

    bcrypt.hash.restore()
  })
})
