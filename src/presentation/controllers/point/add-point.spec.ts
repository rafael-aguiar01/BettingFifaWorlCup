import { AddPointController } from './add-point'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { PointModel } from '../../../domain/models/point'
import { AddPoint, AddPointModel } from '../../../domain/usecases/add-point'

const makeFakePoint = (): PointModel => ({
  code: 'valid_code',
  point: 2
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
})
