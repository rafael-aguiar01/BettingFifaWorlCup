import { UpdateMatchController } from './update-match'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { UpdateMatch, UpdateMatchModel } from '../../../domain/usecases/update-match'

const makeFakeMatch = (): UpdateMatchModel => ({
  code: 'valid_code',
  scoreTeamA: 2,
  scoreTeamB: 2,
  winner: 'valid_winner'
})

const makeUpdateMatch = (): UpdateMatch => {
  class UpdateMatchStub implements UpdateMatch {
    async update (match: UpdateMatchModel): Promise<UpdateMatchModel> {
      return new Promise(resolve => resolve(makeFakeMatch()))
    }
  }
  return new UpdateMatchStub()
}

interface SutTypes {
  sut: UpdateMatchController
  updateMatchStub: UpdateMatch
}

const makeSut = (): SutTypes => {
  const updateMatchStub = makeUpdateMatch()
  const sut = new UpdateMatchController(updateMatchStub)
  return {
    sut,
    updateMatchStub
  }
}

describe('UpdateMatch Controller', () => {
  test('Should return 400 if no code is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        scoreTeamA: 2,
        scoreTeamB: 2,
        winner: 'valid_winner'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('code')))
  })

  test('Should return 400 if no scoreTeamA is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        scoreTeamB: 2,
        winner: 'valid_winner'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('scoreTeamA')))
  })

  test('Should return 400 if no scoreTeamB is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        scoreTeamA: 2,
        winner: 'valid_winner'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('scoreTeamB')))
  })
})
