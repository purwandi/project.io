const chai = require('chai')
const Sprint = require('./sprint')
const { Error, SprintErrorProjectisNotEmpty, SprintErrorNameisNotEmpty } = require('./sprint_error')
const sinon = require('sinon')
const moment = require('moment')

describe('Sprint domain test', () => {
  describe('Project domain unit test suite', () => {

    it('should throw an error on create sprint if project and name is empty', () => {
      chai.expect(() => Sprint.createSprint(''))
        .to.throw(Error(SprintErrorProjectisNotEmpty))

      chai.expect(() => Sprint.createSprint('324234233232'))
        .to.throw(Error(SprintErrorNameisNotEmpty))
    })

    it('can create sprint', () => {
      let sprint = Sprint.createSprint('23423423423', 'Sprint 1')
      chai.expect(sprint)
        .to.include({
          name: 'Sprint 1',
          project_uid: '23423423423',
          status: 'open'
        })
    })

    it('can change sprint name', () => {
      let sprint = Sprint.createSprint('23423423423', 'Sprint 1')
      sprint.changeName('Sprint 2')

      chai.expect(sprint)
        .to.include({
          name: 'Sprint 2',
          project_uid: '23423423423',
          status: 'open'
        })
    })

    it('can start sprint', () => {
      var startOfTime = moment('2016-08-01 10:01:30').valueOf()
      sinon.useFakeTimers(startOfTime)

      let sprint = Sprint.createSprint('23423423423', 'Sprint 1')
      sprint.start()

      chai.expect(sprint)
        .to.include({
          name: 'Sprint 1',
          project_uid: '23423423423',
          status: 'ongoing'
        })

      chai.expect(sprint.start_date).to.eql(new Date())
      chai.expect(sprint.finish_date).to.eql(new Date(Date.now() + 12096e5))
    })

    it ('can finish the sprint', () => {
      let sprint = Sprint.createSprint('23423423423', 'Sprint 1')
      sprint.start()
      sprint.closed()

      chai.expect(sprint.status).to.eql('closed')
    })

  })
})
