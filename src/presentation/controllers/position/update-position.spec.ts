import { UpdatePositionController } from './update-position'
import { MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { UpdatePosition, UpdatePositionModel } from '../../../domain/usecases/update-position'
import { HttpRequest } from '../../protocols'

const makeFakePosition = (): UpdatePositionModel => ({
  code: 'valid_code',
  first: 'valid_team1',
  second: 'valid_team2',
  third: 'valid_team3',
  fourth: 'valid_team4'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'valid_code',
    first: 'valid_team1',
    second: 'valid_team2',
    third: 'valid_team3',
    fourth: 'valid_team4'
  }
})

const makeUpdatePosition = (): UpdatePosition => {
  class UpdatePositionStub implements UpdatePosition {
    async update (position: UpdatePositionModel): Promise<UpdatePositionModel> {
      return new Promise(resolve => resolve(makeFakePosition()))
    }
  }
  return new UpdatePositionStub()
}

interface SutTypes {
  sut: UpdatePositionController
  updatePositionStub: UpdatePosition
}

const makeSut = (): SutTypes => {
  const updatePositionStub = makeUpdatePosition()
  const sut = new UpdatePositionController(updatePositionStub)
  return {
    sut,
    updatePositionStub
  }
}

describe('UpdatePosition Controller', () => {
  test('Should return 400 if no code is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        first: 'valid_team1',
        second: 'valid_team2',
        third: 'valid_team3',
        fourth: 'valid_team4'
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
        second: 'valid_team2',
        third: 'valid_team3',
        fourth: 'valid_team4'
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
        first: 'valid_team1',
        third: 'valid_team3',
        fourth: 'valid_team4'
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
        first: 'valid_team1',
        second: 'valid_team2',
        fourth: 'valid_team4'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('third')))
  })

  test('Should return 400 if no fourth is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        first: 'valid_team1',
        second: 'valid_team2',
        third: 'valid_team3'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('fourth')))
  })

  test('Should return 500 if UpdatePosition throws', async () => {
    const { sut, updatePositionStub } = makeSut()
    jest.spyOn(updatePositionStub, 'update').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call UpdatePosition with correct values', async () => {
    const { sut, updatePositionStub } = makeSut()
    const addSpy = jest.spyOn(updatePositionStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      first: 'valid_team1',
      second: 'valid_team2',
      third: 'valid_team3',
      fourth: 'valid_team4'
    })
  })
})
