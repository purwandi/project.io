const chai = require('chai')
const SprintRepositoryInMemory = require('./sprint_repository')
const Sprint = require('./../domain/sprint')
const { Error, RepositoryErrorIsNotInstanceOfSprint } = require('./repository_error')

describe('Sprint repository test suite', () => {

  it('ca not save new sprint if the parameter is not instanceof sprint', () => {
    let repo = SprintRepositoryInMemory.init()

    chai.expect(() => repo.Save(''))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfSprint))

    chai.expect(() => repo.Save({ title: 'Foobar', body: '2423432-23432432' }))
      .to.throw(Error(RepositoryErrorIsNotInstanceOfSprint))
  })


  it('can save new sprint data into repository', () => {
    let repo = SprintRepositoryInMemory.init()
    let sprint = Sprint.createSprint('1223323', 'Sprint 1')

    repo.Save(sprint)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([ sprint ])
  })
  it('can update repository data', () => {
    let repo = SprintRepositoryInMemory.init()

    let sprint1 = Sprint.createSprint('1223323', 'Sprint 1')
    let sprint2 = Sprint.createSprint('1223323', 'Sprint 2')
    let sprint3 = Sprint.createSprint('1223325', 'Sprint 3')

    repo.Save(sprint1)
    repo.Save(sprint2)
    repo.Save(sprint3)

    sprint2.changeName('Sprint 21')

    repo.Save(sprint2)

    let data = repo.FindAll()

    chai.expect(data)
      .to.be.eql([
        sprint1, sprint2, sprint3
      ])
  })

  it('can save filter sprint by project UID', () => {
    let repo = SprintRepositoryInMemory.init()
    let sprint1 = Sprint.createSprint('1223323', 'Sprint 1')
    let sprint2 = Sprint.createSprint('1223323', 'Sprint 2')
    let sprint3 = Sprint.createSprint('1223325', 'Sprint 3')

    repo.Save(sprint1)
    repo.Save(sprint2)
    repo.Save(sprint3)

    let data = repo.FindAllByProjectUID('1223323')

    chai.expect(data)
      .to.be.eql([ sprint1, sprint2 ])
  })

})
