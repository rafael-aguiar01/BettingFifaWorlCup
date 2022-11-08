import { MongoHelper } from '../helpers/mongo-helper'
import { MatchMongoRepository } from './match'

describe('Match Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const nationCollection = await MongoHelper.getCollection('matches')
    await nationCollection.deleteMany({})
  })

  const makeSut = (): MatchMongoRepository => {
    return new MatchMongoRepository()
  }

  test('Should return an match on success', async () => {
    const sut = makeSut()
    const match = await sut.add({
      code: 2,
      teamA: 'any_teamA',
      scoreTeamA: 1,
      teamB: 'any_teamB',
      scoreTeamB: 2,
      winner: 'valid_winner',
      phase: 'valid_phase'
    })
    expect(match).toBeTruthy()
    expect(match.code).toBe(2)
    expect(match.teamA).toBe('any_teamA')
    expect(match.scoreTeamA).toBe(1)
    expect(match.teamB).toBe('any_teamB')
    expect(match.scoreTeamB).toBe(2)
    expect(match.winner).toBe('valid_winner')
  })
})
