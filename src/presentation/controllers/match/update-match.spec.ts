import { UpdateMatchController } from './update-match'
import { MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { UpdateMatch, UpdateMatchModel } from '../../../domain/usecases/update-match'
import { HttpRequest } from '../../protocols'

const makeFakeMatch = (): UpdateMatchModel => ({
  code: 'valid_code',
  teamA: 'valid_teamA',
  scoreTeamA: 1,
  teamB: 'valid_teamB',
  scoreTeamB: 2,
  winner: 'valid_winner'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 'valid_code',
    teamA: 'valid_teamA',
    scoreTeamA: 1,
    teamB: 'valid_teamB',
    scoreTeamB: 2,
    winner: 'valid_winner'
  }
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
        teamA: 'valid_teamA',
        scoreTeamA: 1,
        teamB: 'valid_teamB',
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
        teamA: 'valid_teamA',
        teamB: 'valid_teamB',
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
        teamA: 'valid_teamA',
        scoreTeamA: 1,
        teamB: 'valid_teamB',
        winner: 'valid_winner'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('scoreTeamB')))
  })

  test('Should return 400 if no winner is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 'valid_code',
        teamA: 'valid_teamA',
        scoreTeamA: 1,
        teamB: 'valid_teamB',
        scoreTeamB: 2
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('winner')))
  })

  test('Should return 500 if Updatematch throws', async () => {
    const { sut, updateMatchStub } = makeSut()
    jest.spyOn(updateMatchStub, 'update').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call Updatematch with correct values', async () => {
    const { sut, updateMatchStub } = makeSut()
    const addSpy = jest.spyOn(updateMatchStub, 'update')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      teamA: 'valid_teamA',
      scoreTeamA: 1,
      teamB: 'valid_teamB',
      scoreTeamB: 2,
      winner: 'valid_winner'
    })
  })
})
