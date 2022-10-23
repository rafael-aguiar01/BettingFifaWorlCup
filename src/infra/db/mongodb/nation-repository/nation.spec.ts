import { MongoHelper } from '../helpers/mongo-helper'
import { NationMongoRepository } from './nation'

describe('Nation Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const nationCollection = await MongoHelper.getCollection('nations')
    await nationCollection.deleteMany({})
  })

  const makeSut = (): NationMongoRepository => {
    return new NationMongoRepository()
  }

  test('Should return an nation on success', async () => {
    const sut = makeSut()
    const nation = await sut.add({
      code: 'any_code',
      name: 'any_name'
    })
    expect(nation).toBeTruthy()
    expect(nation.code).toBe('any_code')
    expect(nation.name).toBe('any_name')
  })
})
