import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Point Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('points')
    await accountCollection.deleteMany({})
  })

  test('Should return an point on success', async () => {
    await request(app)
      .post('/api/point')
      .send({
        code: 'valid_code',
        point: 2
      })
      .expect(200)
  })
})
