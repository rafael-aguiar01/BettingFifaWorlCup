import { AddNationController } from './add-nation'
import { MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { NationModel } from '../../../domain/models/nation'
import { AddNationModel, AddNation } from '../../../domain/usecases/add-nation'
import { HttpRequest } from '../../protocols/http'

const makeFakeNation = (): NationModel => ({
  code: 'valid_code',
  name: 'valid_name'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'valid_code',
    name: 'valid_name'
  }
})

const makeAddNation = (): AddNation => {
  class AddNationStub implements AddNation {
    async add (nation: AddNationModel): Promise<NationModel> {
      return new Promise(resolve => resolve(makeFakeNation()))
    }
  }
  return new AddNationStub()
}

interface SutTypes{
  sut: AddNationController
  addNationStub: AddNation
}

const makeSut = (): SutTypes => {
  const addNationStub = makeAddNation()
  const sut = new AddNationController(addNationStub)
  return {
    sut,
    addNationStub
  }
}

describe('AddNation Controller', () => {
  test('Should return 400 if no code is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('code')))
  })

  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'any_code'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should call AddNation with correct values', async () => {
    const { sut, addNationStub } = makeSut()
    const addSpy = jest.spyOn(addNationStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      name: 'valid_name'
    })
  })

  test('Should return 500 if AddAcount throws', async () => {
    const { sut, addNationStub } = makeSut()
    jest.spyOn(addNationStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
