const chai = require('chai')
const Label = require('./label')
const {
  Error,
  LabelErrorWorkspaceisNotEmpty,
  LabelErrorNameisNotEmpty,
  LabelErrorColorisNotEmpty
} = require('./label_error')

describe('Label domain test', () => {
  describe('Label domain test suite', () => {
    it('should throw an error if the parameter is not valid', () => {
      chai.expect(() => Label.createLabel(''))
        .to.throw(Error(LabelErrorWorkspaceisNotEmpty))

      chai.expect(() => Label.createLabel('sfsdf-sdfsd23-2'))
        .to.throw(Error(LabelErrorNameisNotEmpty))

      chai.expect(() => Label.createLabel('sfsdf-sdfsd23-2', 'engineering'))
        .to.throw(Error(LabelErrorColorisNotEmpty))
    })

    it('can create workspace label', () => {
      let label = Label.createLabel('asadas-asdsad-ewe', 'Engineering', '#FFFFFF')

      chai.expect(label)
        .to.be.include({
          workspace_uid: 'asadas-asdsad-ewe',
          name: 'Engineering',
          color: '#FFFFFF'
        })
    })

    it('can change label data',() => {
      let label = Label.createLabel('asadas-asdsad-ewe', 'Engineering', '#FFFFFF')

      label.changeName('Kreatif')
      label.changeColor('#000')

      chai.expect(label)
        .to.be.include({
          workspace_uid: 'asadas-asdsad-ewe',
          name: 'Kreatif',
          color: '#000'
        })
    })
  })
})
