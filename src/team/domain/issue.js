const { Model } = require('objectmodel')
const {
  Error,
  IssueErrorTitleisNotEmpty,
  IssueErrorProjectIsNotEmpty,
  IssueErrorUserIsNotEmpty
} = require('./issue_error')
const uuid = require('uuid')

const IssueProperty = Model({
  UID: String,
  title: String,
  body: [String],
  project_uid: String,
  created_by: String,
  created_at: Date,
  updated_at: [Date]
})

class Issue extends IssueProperty {

  static createIssue (projectUID, userUID, title, body) {
    if (!projectUID)  throw Error(IssueErrorProjectIsNotEmpty)
    if (!userUID) throw Error(IssueErrorUserIsNotEmpty)
    if (!title) throw Error(IssueErrorTitleisNotEmpty)

    return new Issue({
      UID: uuid.v4(),
      title: title,
      body: body,
      project_uid: projectUID,
      created_by: userUID,
      created_at: new Date()
    })
  }

  changeTitle (title) {
    this.title = title
    this.updated_at = new Date()
  }

  changeBody (body) {
    this.body = body
    this.updated_at = new Date()
  }

}

module.exports = Issue
