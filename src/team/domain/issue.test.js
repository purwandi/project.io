const chai = require('chai')
const { Error, IssueErrorTitleisNotEmpty } = require('./issue_error')
const Issue = require('./issue')

describe('Issue domain test', () => {
  describe('Issue domain test suite', () => {
    it ('should be throw an error if the title is empty', () => {
      chai.expect(() => Issue.createIssue())
        .to.throw(Error(IssueErrorTitleisNotEmpty))
    })

    it ('can create an issue', () => {
      let issue = Issue.createIssue('The issue title')

      chai.expect(issue)
        .to.be.include({
          title: 'The issue title',
          body: null
        })
    })

    it ('can change issue title in issue', () => {
      let issue = Issue.createIssue('The issue title')
      issue.changeTitle('This title is changed')

      chai.expect(issue)
        .to.be.include({
          title: 'This title is changed',
          body: null
        })
    })

    it ('can change issue body', () => {
      let issue = Issue.createIssue('The issue title')
      issue.changeBody('This body is changed')

      chai.expect(issue)
        .to.be.include({
          title: 'The issue title',
          body: 'This body is changed'
        })
    })
  })
})
