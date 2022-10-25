import { MatchModel } from '../../../domain/models/match'
import { AddMatchModel } from '../../../domain/usecases/add-match'
import { AddMatchRepository } from '../../protocols/add-match-repository'
import { DbAddMatch } from './db-add-match'

const makeAddMatchRepository = (): AddMatchRepository => {
  class AddMatchRepositoryStub implements AddMatchRepository {
    async add (matchData: AddMatchModel): Promise<AddMatchModel> {
      return new Promise(resolve => resolve(makeFakeMatch()))
    }
  }
  return new AddMatchRepositoryStub()
}

const makeFakeMatch = (): MatchModel => ({
  code: 'valid_code',
  teamA: 'valid_teamA',
  scoreTeamA: 2,
  teamB: 'valid_TeamB',
  scoreTeamB: 1,
  winner: 'valid_team'
})

const makeFakeMatchData = (): MatchModel => ({
  code: 'valid_code',
  teamA: 'valid_teamA',
  scoreTeamA: 2,
  teamB: 'valid_TeamB',
  scoreTeamB: 1,
  winner: 'valid_team'
})

interface SutTypes {
  sut: DbAddMatch
  addMatchRepositoryStub: AddMatchRepository
}

const makeSut = (): SutTypes => {
  const addMatchRepositoryStub = makeAddMatchRepository()
  const sut = new DbAddMatch(addMatchRepositoryStub)
  return {
    sut,
    addMatchRepositoryStub
  }
}

describe('DbAddMatch Usecase', () => {
  test('Should call AddMatchRepository with correct values', async () => {
    const { sut, addMatchRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addMatchRepositoryStub, 'add')
    await sut.add(makeFakeMatchData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 'valid_code',
      teamA: 'valid_teamA',
      scoreTeamA: 2,
      teamB: 'valid_TeamB',
      scoreTeamB: 1,
      winner: 'valid_team'
    })
  })

  test('Should throw if AddNationRepository throws', async () => {
    const { sut, addMatchRepositoryStub } = makeSut()
    jest.spyOn(addMatchRepositoryStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(makeFakeMatchData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an match on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeMatchData())
    expect(account).toEqual(makeFakeMatch())
  })
})
