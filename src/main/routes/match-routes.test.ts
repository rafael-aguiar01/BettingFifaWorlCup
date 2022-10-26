import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Match Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('matchs')
    await accountCollection.deleteMany({})
  })

  test('Should return an match on success', async () => {
    await request(app)
      .post('/api/match')
      .send({
        code: 'valid_code',
        teamA: 'valid_teamA',
        scoreTeamA: 1,
        teamB: 'valid_teamB',
        scoreTeamB: 2,
        winner: 'winner'
      })
      .expect(200)
  })
})
