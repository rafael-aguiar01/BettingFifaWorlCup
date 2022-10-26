import { MongoHelper } from '../helpers/mongo-helper'
import { GroupMongoRepository } from './group'

describe('Group Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const nationCollection = await MongoHelper.getCollection('groups')
    await nationCollection.deleteMany({})
  })

  const makeSut = (): GroupMongoRepository => {
    return new GroupMongoRepository()
  }

  test('Should return an group on success', async () => {
    const sut = makeSut()
    const nation = await sut.add({
      code: 'any_code',
      teamA: 'any_teamA',
      teamB: 'any_teamB',
      teamC: 'any_teamC',
      teamD: 'any_teamD'
    })
    expect(nation).toBeTruthy()
    expect(nation.code).toBe('any_code')
    expect(nation.teamA).toBe('any_teamA')
    expect(nation.teamB).toBe('any_teamB')
    expect(nation.teamC).toBe('any_teamC')
    expect(nation.teamD).toBe('any_teamD')
  })
})
