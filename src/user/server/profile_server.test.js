const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('./../../app')()
const { UserRepositoryInMemory } = require('./../repository')
const { User } = require('./../domain')

let userRepo = UserRepositoryInMemory.init()

app.use('/auth', require('./auth_server')(userRepo))
app.use('/me', require('./profile_server')(userRepo))

chai.use(chaiHttp)

let agent = chai.request.agent(app)

describe('Profile http server test', () => {

  before(async () => {
    let user = await User.createUser('foobar', 'password')
    user.changeEmail('foo@bar.com')
    user.changeName('Foobar')

    userRepo.Save(user)

    await agent.post('/auth/signin')
      .send({
        username: 'foobar',
        password: 'password'
      })
  })

  after(() => {
    agent.close()
  })

  it('can show my profile', (done) => {
    agent.get('/me')
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data)
          .to.include({ username: 'foobar', email: 'foo@bar.com', name: 'Foobar' })
        done()
      })
  })

  it('should return error 400', (done) => {
    chai.request(app)
      .get('/me')
      .end((err, res) => {
        chai.expect(res).to.have.status(400)
        done()
      })
  })

  it('can update user profile', (done) => {
    agent.put('/me')
      .send({
        email: 'foobar@bar.com',
        name: 'Foobar User'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        chai.expect(res.body.data)
          .to.include({ username: 'foobar', email: 'foobar@bar.com', name: 'Foobar User' })
        done()
      })
  })

  it('can update password', (done) => {
    agent.put('/me/change-password')
      .send({
        password: 'password',
        new_password: 'new-password',
        new_confirm_password: 'new-password'
      })
      .end((err, res) => {
        chai.expect(res).to.have.status(200)
        done()
      })
  })
})
