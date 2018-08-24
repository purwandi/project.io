const { Model } = require('objectmodel')
const uuid = require('uuid')
const {
  Error,
  LabelErrorWorkspaceisNotEmpty,
  LabelErrorNameisNotEmpty,
  LabelErrorColorisNotEmpty
} = require('./label_error')

const LabelProperty = Model({
  UID: String,
  workspace_uid: String,
  name: String,
  color: String,
  created_at: Date,
  updated_at: [Date]
})

class Label extends LabelProperty {

  static createLabel (workspaceUID, name, color) {
    if (!workspaceUID) throw Error(LabelErrorWorkspaceisNotEmpty)
    if (!name) throw Error(LabelErrorNameisNotEmpty)
    if (!color) throw Error(LabelErrorColorisNotEmpty)

    return new Label({
      UID: uuid.v4(),
      workspace_uid: workspaceUID,
      name: name,
      color: color,
      created_at: new Date()
    })
  }

  changeName (name) {
    this.name = name
    this.updated_at = new Date()
  }

  changeColor (color) {
    this.color = color
    this.updated_at = new Date()
  }

}


module.exports = Label
