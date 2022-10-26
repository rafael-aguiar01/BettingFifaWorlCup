import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Group Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('groups')
    await accountCollection.deleteMany({})
  })

  test('Should return an group on success', async () => {
    await request(app)
      .post('/api/group')
      .send({
        code: 'valid_code',
        teamA: 'valid_teamA',
        teamB: 'valid_teamB',
        teamC: 'valid_teamC',
        teamD: 'valid_teamD'
      })
      .expect(200)
  })
})
