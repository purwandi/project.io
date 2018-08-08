const chai = require('chai')
const { Error, IssueErrorTitleisNotEmpty, IssueErrorBoardIsNotEmpty } = require('./issue_error')
const Issue = require('./issue')

describe('Issue domain test', () => {
  describe('Issue domain test suite', () => {
    it('should be throw an error if the board is empty', () => {
      chai.expect(() => Issue.createIssue())
        .to.throw(Error(IssueErrorBoardIsNotEmpty))
    })

    it('should be throw an error if the title is empty', () => {
      chai.expect(() => Issue.createIssue('asdasd-er4wrewrew'))
        .to.throw(Error(IssueErrorTitleisNotEmpty))
    })

    it('can create an issue', () => {
      let issue = Issue.createIssue('121asd2-312bhjfsdf34sf', 'The issue title')

      chai.expect(issue)
        .to.be.include({
          title: 'The issue title',
          boardUID: '121asd2-312bhjfsdf34sf'
        })
    })

    it('can change issue title in issue', () => {
      let issue = Issue.createIssue('121asd2-312bhjfsdf34sf', 'The issue title')
      issue.changeTitle('This title is changed')

      chai.expect(issue)
        .to.be.include({
          title: 'This title is changed',
          body: undefined,
          boardUID: '121asd2-312bhjfsdf34sf'
        })
    })

    it('can change issue body', () => {
      let issue = Issue.createIssue('121asd2-312bhjfsdf34sf', 'The issue title')
      issue.changeBody('This body is changed')

      chai.expect(issue)
        .to.be.include({
          title: 'The issue title',
          body: 'This body is changed',
          boardUID: '121asd2-312bhjfsdf34sf'
        })
    })
  })
})
