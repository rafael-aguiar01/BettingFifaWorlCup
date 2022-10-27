import { MongoHelper } from '../helpers/mongo-helper'
import { PointMongoRepository } from './point'

describe('Point Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const nationCollection = await MongoHelper.getCollection('points')
    await nationCollection.deleteMany({})
  })

  const makeSut = (): PointMongoRepository => {
    return new PointMongoRepository()
  }

  test('Should return at point on success', async () => {
    const sut = makeSut()
    const nation = await sut.add({
      code: 'any_code',
      point: 2
    })
    expect(nation).toBeTruthy()
    expect(nation.code).toBe('any_code')
    expect(nation.point).toBe(2)
  })
})
