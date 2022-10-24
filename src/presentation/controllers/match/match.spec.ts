import { AddMatchController } from './match'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { MatchModel } from '../../../domain/models/match'
import { HttpRequest } from '../../protocols'
import { AddMatch, AddMatchModel } from '../../../domain/usecases/add-match'

const makeFakeMatch = (): MatchModel => ({
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
        code: 'valid_code',
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

  test('Should call AddMatch with correct values', async () => {
    const { sut, addMatchStub } = makeSut()
    const addSpy = jest.spyOn(addMatchStub, 'add')
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
