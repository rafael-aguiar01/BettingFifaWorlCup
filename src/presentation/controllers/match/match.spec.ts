import { AddMatchController } from './match'
import { MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { MatchModel } from '../../../domain/models/match'
import { HttpRequest } from '../../protocols'
import { AddMatch, AddMatchModel } from '../../../domain/usecases/add-match'

const makeFakeMatch = (): MatchModel => ({
  code: 2,
  teamA: 'valid_teamA',
  scoreTeamA: 1,
  teamB: 'valid_teamB',
  scoreTeamB: 2,
  winner: 'valid_winner'
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    code: 2,
    teamA: 'valid_teamA',
    scoreTeamA: 1,
    teamB: 'valid_teamB',
    scoreTeamB: 2,
    winner: 'valid_winner'
  }
})

const makeAddMatch = (): AddMatch => {
  class AddMatchStub implements AddMatch {
    async add (match: AddMatchModel): Promise<MatchModel> {
      return new Promise(resolve => resolve(makeFakeMatch()))
    }
  }
  return new AddMatchStub()
}

interface SutTypes{
  sut: AddMatchController
  addMatchStub: AddMatch
}

const makeSut = (): SutTypes => {
  const addMatchStub = makeAddMatch()
  const sut = new AddMatchController(addMatchStub)
  return {
    sut,
    addMatchStub
  }
}

describe('AddMatch Controller', () => {
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

  test('Should return 400 if no teamA is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 2,
        scoreTeamA: 1,
        teamB: 'valid_teamB',
        scoreTeamB: 2,
        winner: 'valid_winner'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('teamA')))
  })

  test('Should return 400 if no scoreTeamA is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 2,
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

  test('Should return 400 if no teamB is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 2,
        teamA: 'valid_teamA',
        scoreTeamA: 1,
        scoreTeamB: 2,
        winner: 'valid_winner'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('teamB')))
  })

  test('Should return 400 if no scoreTeamB is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        code: 2,
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
        code: 2,
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

  test('Should return 500 if Addmatch throws', async () => {
    const { sut, addMatchStub } = makeSut()
    jest.spyOn(addMatchStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddMatch with correct values', async () => {
    const { sut, addMatchStub } = makeSut()
    const addSpy = jest.spyOn(addMatchStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      code: 2,
      teamA: 'valid_teamA',
      scoreTeamA: 1,
      teamB: 'valid_teamB',
      scoreTeamB: 2,
      winner: 'valid_winner'
    })
  })
})
