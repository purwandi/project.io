const chai = require('chai')
const { NewTeamMemberRepositoryInMemory } = require('./team_member_repository')
const TeamMember = require('./../domain/team_member')

describe('Team Member Repository Test', () => {
  it('can save new team member', () => {
    let repo = NewTeamMemberRepositoryInMemory()

    let member1 = TeamMember.createTeamMember('12323-123123-12321', '22323-123123-12321', 'admin')
    let member2 = TeamMember.createTeamMember('12323-123123-12321', '22323-123123-12322', 'member')
    let member3 = TeamMember.createTeamMember('12323-123123-12322', '22323-123123-12321', 'admin')

    repo.Save(member1)
    repo.Save(member2)
    repo.Save(member3)

    let members = repo.FindAll()

    chai.expect(members)
      .to.be.eql([
        member1, member2, member3
      ])

  })

  it('can udpate repository data', () => {
    let repo = NewTeamMemberRepositoryInMemory()

    let member1 = TeamMember.createTeamMember('12323-123123-12321', '22323-123123-12321', 'admin')
    let member2 = TeamMember.createTeamMember('12323-123123-12321', '22323-123123-12322', 'member')
    let member3 = TeamMember.createTeamMember('12323-123123-12322', '22323-123123-12321', 'admin')
    let member4 = TeamMember.createTeamMember('12323-123123-12322', '22323-123123-12321', 'member')

    repo.Save(member1)
    repo.Save(member2)
    repo.Save(member3)
    repo.Save(member4)

    let members = repo.FindAll()

    chai.expect(members)
      .to.be.eql([
        member1, member2, member4
      ])

  })

  it('can find all find team by user id', () => {
    let repo = NewTeamMemberRepositoryInMemory()

    let member1 = TeamMember.createTeamMember('12323-123123-12321', '22323-123123-12321', 'admin')
    let member2 = TeamMember.createTeamMember('12323-123123-12321', '22323-123123-12322', 'member')
    let member3 = TeamMember.createTeamMember('12323-123123-12322', '22323-123123-12321', 'admin')
    let member4 = TeamMember.createTeamMember('12323-123123-12322', '22323-123123-12321', 'member')

    repo.Save(member1)
    repo.Save(member2)
    repo.Save(member3)
    repo.Save(member4)

    let members = repo.FindAllByUserId('12323-123123-12321')

    chai.expect(members)
      .to.be.eql([member1, member2])
  })

  it('can find all find team by team id', () => {
    let repo = NewTeamMemberRepositoryInMemory()

    let member1 = TeamMember.createTeamMember('12323-123123-12321', '22323-123123-12321', 'admin')
    let member2 = TeamMember.createTeamMember('12323-123123-12321', '22323-123123-12322', 'member')
    let member3 = TeamMember.createTeamMember('12323-123123-12322', '22323-123123-12321', 'admin')
    let member4 = TeamMember.createTeamMember('12323-123123-12322', '22323-123123-12321', 'member')

    repo.Save(member1)
    repo.Save(member2)
    repo.Save(member3)
    repo.Save(member4)

    let members = repo.FindAllByTeamID('22323-123123-12321')

    chai.expect(members)
      .to.be.eql([member1, member4])
  })
})
