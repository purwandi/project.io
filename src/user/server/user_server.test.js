const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../../app')()
const { UserRepositoryInMemory } = require('./../repository')
const { User } = require('./../domain')

let userRepo = UserRepositoryInMemory.init()

app.use('/users', require('./user_server')(userRepo))

chai.use(chaiHttp)

describe('User http service test', () => {

  before (async () => {
    let user1 = await User.createUser('foobar', 'foo-password')
    let user2 = await User.createUser('foobar-2', 'foo-password-2')

    userRepo.Save(user1)
    userRepo.Save(user2)
  })

  it('should get all user data', (done) => {
    chai.request(app)
      .get('/users')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data[0])
          .to.include({
            username: 'foobar'
          })
        chai.expect(res.body.data[1])
          .to.include({
            username: 'foobar-2'
          })
        done()
      })
  })

  it('can get user data from their username', (done) => {
    chai.request(app)
      .get('/users/foobar')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data)
          .to.include({
            username: 'foobar'
          })
        done()
      })
  })
})
