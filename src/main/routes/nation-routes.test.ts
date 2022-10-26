import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Nation Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('nations')
    await accountCollection.deleteMany({})
  })
  test('Should return an nation on success', async () => {
    await request(app)
      .post('/api/nation')
      .send({
        code: 'BRA',
        name: 'BRASIL'
      })
      .expect(200)
  })
})
