import { AddPointController } from './add-point'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { PointModel } from '../../../domain/models/point'
import { HttpRequest } from '../../protocols'
import { AddPoint, AddPointModel } from '../../../domain/usecases/add-point'

const makeFakePoint = (): PointModel => ({
  code: 'valid_code',
  point: 2
})

const makeFakeRequest = (): HttpRequest => ({
  body: ({
    code: 'valid_code',
    point: 2
  })
})

const makeAddPoint = (): AddPoint => {
  class AddPointStub implements AddPoint {
    async add (point: AddPointModel): Promise<PointModel> {
      return new Promise(resolve => resolve(makeFakePoint()))
    }
  }
  return new AddPointStub()
}

interface SutTypes{
  sut: AddPointController
  addPointStub: AddPoint
}

const makeSut = (): SutTypes => {
  const addPointStub = makeAddPoint()
  const sut = new AddPointController(addPointStub)
  return {
    sut,
    addPointStub
  }
}

describe('AddPoint Controller', () => {
  test('Should return 400 if no code is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        point: 2
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('code')))
  })

  test('Should return 400 if no point is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('point')))
  })

  test('Should call AddPoint with correct values', async () => {
    const { sut, addPointStub } = makeSut()
    const addSpy = jest.spyOn(addPointStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      point: 2
    })
  })
})
