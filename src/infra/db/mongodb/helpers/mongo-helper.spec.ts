import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect
  })

  test('Should reconnect', async () => {
    let nationCollection = await sut.getCollection('nations')
    expect(nationCollection).toBeTruthy()
    await sut.disconnect()
    nationCollection = await sut.getCollection('nations')
    expect(nationCollection).toBeTruthy()
  })
})
