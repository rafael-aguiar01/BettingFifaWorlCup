import { AddGroupController } from './group'
import { MissingParamError } from '../../errors'
// import { badRequest, serverError } from '../../helpers/http-helper'
import { GroupModel } from '../../../domain/models/group'
import { HttpRequest } from '../../protocols'
import { AddGroup, AddGroupModel } from '../../../domain/usecases/add-group'
import { badRequest } from '../../helpers/http-helper'

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
  test('Should return 400 if no code is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        teamA: 'valid_teamA',
        teamB: 'valid_teamB',
        teamC: 'valid_teamC',
        teamD: 'valid_teamD'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('code')))
  })

  test('Should return 400 if no teamA is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        teamB: 'valid_teamB',
        teamC: 'valid_teamC',
        teamD: 'valid_teamD'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('teamA')))
  })

  test('Should return 400 if no teamB is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        teamA: 'valid_teamA',
        teamC: 'valid_teamC',
        teamD: 'valid_teamD'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('teamB')))
  })

  test('Should return 400 if no teamC is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        teamA: 'valid_teamA',
        teamB: 'valid_teamB',
        teamD: 'valid_teamD'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('teamC')))
  })

  test('Should return 400 if no teamD is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        teamA: 'valid_teamA',
        teamB: 'valid_teamB',
        teamC: 'valid_teamC'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('teamD')))
  })

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
