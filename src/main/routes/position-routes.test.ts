import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Position Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('positions')
    await accountCollection.deleteMany({})
  })

  test('Should return at positions on success', async () => {
    await request(app)
      .post('/api/position')
      .send({
        code: 'any_code',
        first: 'any_first',
        second: 'any_second',
        third: 'any_third',
        fourth: 'any_fourth'
      })
      .expect(200)
  })
})
