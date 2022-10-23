import { AddGroupController } from './group'
// import { MissingParamError, ServerError } from '../../errors'
// import { badRequest, serverError } from '../../helpers/http-helper'
import { GroupModel } from '../../../domain/models/group'
import { HttpRequest } from '../../protocols'
import { AddGroup, AddGroupModel } from '../../../domain/usecases/add-group'

const makeFakeGroup = (): GroupModel => ({
  code: 'valid_code',
  teamA: 'valid_teamA',
  teamB: 'valid_teamB',
  teamC: 'valid_teamC',
  teamD: 'valid_teamD'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'valid_code',
    teamA: 'valid_teamA',
    teamB: 'valid_teamB',
    teamC: 'valid_teamC',
    teamD: 'valid_teamD'
  }
})

const makeAddGroup = (): AddGroup => {
  class AddGroupStub implements AddGroup {
    async add (group: AddGroupModel): Promise<GroupModel> {
      return new Promise(resolve => resolve(makeFakeGroup()))
    }
  }
  return new AddGroupStub()
}

interface SutTypes{
  sut: AddGroupController
  addGroupStub: AddGroup
}

const makeSut = (): SutTypes => {
  const addGroupStub = makeAddGroup()
  const sut = new AddGroupController(addGroupStub)
  return {
    sut,
    addGroupStub
  }
}

describe('AddMatch Controller', () => {
  test('Should call AddMatch with correct values', async () => {
    const { sut, addGroupStub } = makeSut()
    const addSpy = jest.spyOn(addGroupStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      teamA: 'valid_teamA',
      teamB: 'valid_teamB',
      teamC: 'valid_teamC',
      teamD: 'valid_teamD'
    })
  })
})
