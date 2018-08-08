const chai = require('chai')
const User = require('./../domain/user')
const { NewUserRepositoryInMemory } = require('./user_repository')
const { Error, RepositoryErrorIsNotInstanceOfUser } = require('./repository_error')

describe('User repository test', () => {
  it('can save user data', () => {
    let repo = NewUserRepositoryInMemory()
    let user1 = User.createUser('foobar1', 'foo-password-1')
    let user2 = User.createUser('foobar2', 'foo-password-2')
    let user3 = User.createUser('foobar3', 'foo-password-3')

    repo.Save(user1)
    repo.Save(user2)
    repo.Save(user3)

    chai.expect(repo.FindAll())
      .to.be.eql([
        user1, user2, user3
      ])
  })

  it('can update repository data', () => {
    let repo = NewUserRepositoryInMemory()
    let user1 = User.createUser('foobar1', 'foo-password-1')
    let user2 = User.createUser('foobar2', 'foo-password-2')
    let user3 = User.createUser('foobar3', 'foo-password-3')

    repo.Save(user1)
    repo.Save(user2)
    repo.Save(user3)

    user2.changePassword('pass')
    repo.Save(user2)

    chai.expect(repo.FindAll())
      .to.be.eql([
        user1, user2, user3
      ])
  })

  it('can find user by user uid', () => {
    let repo = NewUserRepositoryInMemory()
    let user1 = User.createUser('foobar1', 'foo-password-1')
    let user2 = User.createUser('foobar2', 'foo-password-2')
    let user3 = User.createUser('foobar3', 'foo-password-3')

    repo.Save(user1)
    repo.Save(user2)
    repo.Save(user3)

    chai.expect(repo.FindById(user2.UID))
      .to.be.eql(user2)
  })

  it('should throw an error user parameter is not instance of user', () => {
    let repo = NewUserRepositoryInMemory()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfUser))

    chai.expect(() => repo.Save({ username: 'Hello', password: 'password' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfUser))
  })
})
