const { Model } = require('objectmodel')
const {
  Error,
  IssueErrorTitleisNotEmpty,
  IssueErrorBoardIsNotEmpty
} = require('./issue_error')
const uuid = require('uuid')

const IssueProperty = Model({
  UID: String,
  title: String,
  body: [String],
  boardUID: String,
  created_at: Date,
  updated_at: [Date]
})

class Issue extends IssueProperty {

  static createIssue (boardUID, title, body) {
    if (!boardUID) {
      throw Error(IssueErrorBoardIsNotEmpty)
    }

    if (!title) {
      throw Error(IssueErrorTitleisNotEmpty)
    }

    return new Issue({
      UID: uuid.v4(),
      title: title,
      body: body,
      boardUID: boardUID,
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
