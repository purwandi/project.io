const knex = require('knex')
const sqlite = require('./sqlite')

module.exports = (config) => {
  switch (config) {
    case 'sqlite':
      return knex(sqlite)
      break
    case 'mysql':
      return knex(sqlite)
      break
    default:
      return 'helo'
      break
  }
}
