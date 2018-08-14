const chai = require('chai')
const { Error, IssueErrorTitleisNotEmpty, IssueErrorProjectIsNotEmpty, IssueErrorUserIsNotEmpty } = require('./issue_error')
const Issue = require('./issue')

describe('Issue domain test', () => {
  describe('Issue domain test suite', () => {
    it('should be throw an error if the project is empty', () => {
      chai.expect(() => Issue.createIssue())
        .to.throw(Error(IssueErrorProjectIsNotEmpty))
    })

    it('should be throw an error if the created by is empty', () => {
      chai.expect(() => Issue.createIssue('asdasd-er4wrewrew'))
        .to.throw(Error(IssueErrorUserIsNotEmpty))
    })

    it('should be throw an error if the title is empty', () => {
      chai.expect(() => Issue.createIssue('asdasd-er4wrewrew', '1223-322'))
        .to.throw(Error(IssueErrorTitleisNotEmpty))
    })

    it('can create an issue', () => {
      let issue = Issue.createIssue('121asd2-312bhjfsdf34sf', '233-232', 'The issue title')

      chai.expect(issue)
        .to.be.include({
          title: 'The issue title',
          project_uid: '121asd2-312bhjfsdf34sf',
          created_by: '233-232'
        })
    })

    it('can change issue title in issue', () => {
      let issue = Issue.createIssue('121asd2-312bhjfsdf34sf', '233-232', 'The issue title')
      issue.changeTitle('This title is changed')

      chai.expect(issue)
        .to.be.include({
          title: 'This title is changed',
          body: undefined,
          project_uid: '121asd2-312bhjfsdf34sf',
          created_by: '233-232'
        })
    })

    it('can change issue body', () => {
      let issue = Issue.createIssue('121asd2-312bhjfsdf34sf', '233-232', 'The issue title')
      issue.changeBody('This body is changed')

      chai.expect(issue)
        .to.be.include({
          title: 'The issue title',
          body: 'This body is changed',
          project_uid: '121asd2-312bhjfsdf34sf',
          created_by: '233-232'
        })
    })
  })
})
