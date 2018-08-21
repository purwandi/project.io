const assert = require('assert')
const { expect } = require('chai')
const Workspace = require('./workspace')
const {
  Error,
  WorkspaceErrorNameisNotEmpty,
  WorkspaceErrorSlugisNotEmpty,
  WorkspaceErrorSlugIsNotValid
} = require('./workspace_errors')

describe('Workspace domain test', () => {
  describe('Workspace unit test suite', () => {
    it('should throw error if name is blank', () => {
      expect(() => Workspace.createWorkspace(''))
        .to.throw(Error(WorkspaceErrorNameisNotEmpty))
    })

    it('should throw error if slug is blank', () => {
      expect(() => Workspace.createWorkspace('Foobar'))
        .to.throw(Error(WorkspaceErrorSlugisNotEmpty))
    })

    it('should throw error, if slug is not valid format', () => {
      expect(() => Workspace.createWorkspace('Foobar', 'Foobar Awesome'))
        .to.throw(Error(WorkspaceErrorSlugIsNotValid))

      expect(() => Workspace.createWorkspace('Foobar', 'Foobar-Awesome'))
        .to.throw(Error(WorkspaceErrorSlugIsNotValid))

      expect(() => Workspace.createWorkspace('Foobar', 'Foobar-'))
        .to.throw(Error(WorkspaceErrorSlugIsNotValid))
    })

    it('should create new workspace', () => {
      let workspace = Workspace.createWorkspace('Foobar', 'foobar-awesome')
      assert.strictEqual(true, workspace instanceof Workspace)
      assert.strictEqual('Foobar', workspace.name)
      assert.strictEqual('foobar-awesome', workspace.slug)
    })

  })
})
