import { MongoHelper } from '../helpers/mongo-helper'
import { PositionMongoRepository } from './position'

describe('Position Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const nationCollection = await MongoHelper.getCollection('positions')
    await nationCollection.deleteMany({})
  })

  const makeSut = (): PositionMongoRepository => {
    return new PositionMongoRepository()
  }

  test('Should return at position on success', async () => {
    const sut = makeSut()
    const nation = await sut.add({
      code: 'any_code',
      first: 'any_first',
      second: 'string',
      third: 'string',
      fourth: 'string'
    })
    expect(nation).toBeTruthy()
    expect(nation.code).toBe('any_code')
    expect(nation.first).toBe('any_first')
  })
})
