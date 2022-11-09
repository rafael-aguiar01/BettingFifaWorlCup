import { UpdatePositionController } from './update-position'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { UpdatePosition, UpdatePositionModel } from '../../../domain/usecases/update-position'

const makeFakePosition = (): UpdatePositionModel => ({
  code: 'valid_code',
  first: 'valid_team1',
  second: 'valid_team2',
  third: 'valid_team3',
  fourth: 'valid_team4'
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
})
