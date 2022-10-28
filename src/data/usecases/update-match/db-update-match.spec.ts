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
  code: 'valid_code',
  teamA: 'valid_teamA',
  scoreTeamA: 2,
  teamB: 'valid_teamB',
  scoreTeamB: 1,
  winner: 'valid_winner'
})

const makeFakeUpdateMatchData = (): UpdateMatchModel => ({
  code: 'valid_code',
  teamA: 'valid_teamA',
  scoreTeamA: 2,
  teamB: 'valid_teamB',
  scoreTeamB: 1,
  winner: 'valid_winner'
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
      code: 'valid_code',
      teamA: 'valid_teamA',
      scoreTeamA: 2,
      teamB: 'valid_teamB',
      scoreTeamB: 1,
      winner: 'valid_winner'
    })
  })
})
