import { AddPositionController } from './add-position'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { PositionModel } from '../../../domain/models/position'
import { HttpRequest } from '../../protocols'
import { AddPosition, AddPositionModel } from '../../../domain/usecases/add-position'

const makeFakePosition = (): PositionModel => ({
  code: 'valid_code',
  first: 'valid_first',
  second: 'valid_second',
  third: 'valid_third',
  fourth: 'valid_fourth'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'valid_code',
    first: 'valid_first',
    second: 'valid_second',
    third: 'valid_third',
    fourth: 'valid_fourth'
  }
})

const makeAddPosition = (): AddPosition => {
  class AddPositionStub implements AddPosition {
    async add (position: AddPositionModel): Promise<PositionModel> {
      return new Promise(resolve => resolve(makeFakePosition()))
    }
  }
  return new AddPositionStub()
}

interface SutTypes{
  sut: AddPositionController
  addPositionStub: AddPosition
}

const makeSut = (): SutTypes => {
  const addPositionStub = makeAddPosition()
  const sut = new AddPositionController(addPositionStub)
  return {
    sut,
    addPositionStub
  }
}

describe('AddPosition Controller', () => {
  test('Should return 400 if no code is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        first: 'valid_first',
        second: 'valid_second',
        third: 'valid_third',
        fourth: 'valid_fourth'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('code')))
  })

  test('Should return 400 if no first is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        second: 'valid_second',
        third: 'valid_third',
        fourth: 'valid_fourth'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('first')))
  })

  test('Should return 400 if no second is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        first: 'valid_first',
        third: 'valid_third',
        fourth: 'valid_fourth'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('second')))
  })

  test('Should return 400 if no third is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        first: 'valid_first',
        second: 'valid_second',
        fourth: 'valid_fourth'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('third')))
  })

  test('Should call AddPosition with correct values', async () => {
    const { sut, addPositionStub } = makeSut()
    const addSpy = jest.spyOn(addPositionStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      first: 'valid_first',
      second: 'valid_second',
      third: 'valid_third',
      fourth: 'valid_fourth'
    })
  })
})
