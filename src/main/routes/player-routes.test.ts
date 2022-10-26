import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Player Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('players')
    await accountCollection.deleteMany({})
  })

  test('Should return an player on success', async () => {
    await request(app)
      .post('/api/player')
      .send({
        name: 'valid_name',
        cellphone: 'valid_cellphone',
        matches: { },
        position: { }
      })
      .expect(200)
  })
})
