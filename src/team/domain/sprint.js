const { Model } = require('objectmodel')
const { Error, SprintErrorProjectisNotEmpty, SprintErrorNameisNotEmpty } = require('./sprint_error')
const uuid = require('uuid')

const SprintProperty = Model({
  UID: String,
  name: String,
  project_uid: String,
  status: ['open', 'ongoing', 'closed'],
  start_date: [Date],
  finish_date: [Date]
})

class Sprint extends SprintProperty {

  static createSprint (projectUID, name) {
    if (!projectUID) throw Error(SprintErrorProjectisNotEmpty)
    if (!name) throw Error(SprintErrorNameisNotEmpty)

    return new Sprint({
      UID: uuid.v4(),
      project_uid: projectUID,
      name: name,
      status: 'open'
    })
  }

  changeName (name) {
    this.name = name
  }

  start () {
    let duration = 12096e5

    this.status = 'ongoing'
    this.start_date = new Date()
    this.finish_date = new Date(Date.now() + duration)
  }

  closed () {
    this.status = 'closed'
  }

}

module.exports = Sprint
