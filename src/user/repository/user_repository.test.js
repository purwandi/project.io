const chai = require('chai')
const User = require('./../domain/user')
const UserRepositoryInMemory = require('./user_repository')
const { Error, RepositoryErrorIsNotInstanceOfUser } = require('./repository_error')

chai.use(require('chai-as-promised'))

describe('User repository test', () => {
  it('can save user data', async () => {
    let repo = UserRepositoryInMemory.init()
    let user1 = await User.createUser('foobar1', 'foo-password-1')
    let user2 = await User.createUser('foobar2', 'foo-password-2')
    let user3 = await User.createUser('foobar3', 'foo-password-3')

    repo.Save(user1)
    repo.Save(user2)
    repo.Save(user3)

    chai.expect(repo.FindAll())
      .to.be.eql([
        user1, user2, user3
      ])
  })

  it('can update repository data', async () => {
    let repo = UserRepositoryInMemory.init()
    let user1 = await User.createUser('foobar1', 'foo-password-1')
    let user2 = await User.createUser('foobar2', 'foo-password-2')
    let user3 = await User.createUser('foobar3', 'foo-password-3')

    repo.Save(user1)
    repo.Save(user2)
    repo.Save(user3)

    await user2.changePassword('foo-password-2', 'pass', 'pass')
    repo.Save(user2)

    chai.expect(repo.FindAll())
      .to.be.eql([
        user1, user2, user3
      ])
  })

  it('can find user by user uid', async () => {
    let repo = UserRepositoryInMemory.init()
    let user1 = await User.createUser('foobar1', 'foo-password-1')
    let user2 = await User.createUser('foobar2', 'foo-password-2')
    let user3 = await User.createUser('foobar3', 'foo-password-3')

    repo.Save(user1)
    repo.Save(user2)
    repo.Save(user3)

    chai.expect(repo.FindByUID(user2.UID))
      .to.be.eql(user2)
  })

  it('should throw an error user parameter is not instance of user', () => {
    let repo = UserRepositoryInMemory.init()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfUser))

    chai.expect(() => repo.Save({ username: 'Hello', password: 'password' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfUser))
  })
})
