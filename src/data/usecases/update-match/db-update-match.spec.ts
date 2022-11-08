import { MatchModel, UpdateMatchModel, UpdateMatchRepository } from './db-update-match-protocols'
import { DbUpdateMatch } from './db-update-match'

const makeUpdateMatchRepository = (): UpdateMatchRepository => {
  class UpdateMatchRepositoryStub implements UpdateMatchRepository {
    async update (nationData: UpdateMatchModel): Promise<MatchModel> {
      return new Promise(resolve => resolve(makeFakeMatch()))
    }
  }
  return new UpdateMatchRepositoryStub()
}

const makeFakeMatch = (): MatchModel => ({
  code: 2,
  teamA: 'valid_teamA',
  scoreTeamA: 2,
  teamB: 'valid_teamB',
  scoreTeamB: 1,
  winner: 'valid_winner',
  phase: 'valid_phase'
})

const makeFakeUpdateMatchData = (): UpdateMatchModel => ({
  code: 2,
  teamA: 'valid_teamA',
  scoreTeamA: 2,
  teamB: 'valid_teamB',
  scoreTeamB: 1,
  winner: 'valid_winner',
  phase: 'valid_phase'
})

interface SutTypes {
  sut: DbUpdateMatch
  updateMatchRepositoryStub: UpdateMatchRepository
}

const makeSut = (): SutTypes => {
  const updateMatchRepositoryStub = makeUpdateMatchRepository()
  const sut = new DbUpdateMatch(updateMatchRepositoryStub)
  return {
    sut,
    updateMatchRepositoryStub
  }
}

describe('DbUpdate Usecase', () => {
  test('Should call UpdateMatchRepository with correct values', async () => {
    const { sut, updateMatchRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(updateMatchRepositoryStub, 'update')
    await sut.update(makeFakeUpdateMatchData())
    expect(addSpy).toHaveBeenCalledWith({
      code: 2,
      teamA: 'valid_teamA',
      scoreTeamA: 2,
      teamB: 'valid_teamB',
      scoreTeamB: 1,
      winner: 'valid_winner',
      phase: 'valid_phase'
    })
  })

  test('Should throw if UpdateMatchRepository throws', async () => {
    const { sut, updateMatchRepositoryStub } = makeSut()
    jest.spyOn(updateMatchRepositoryStub, 'update').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.update(makeFakeUpdateMatchData())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an match updated on success', async () => {
    const { sut } = makeSut()
    const account = await sut.update(makeFakeUpdateMatchData())
    expect(account).toEqual(makeFakeMatch())
  })
})
