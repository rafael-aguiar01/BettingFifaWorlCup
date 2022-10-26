import { MongoHelper } from '../helpers/mongo-helper'
import { PlayerMongoRepository } from './player'

describe('Player Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const nationCollection = await MongoHelper.getCollection('players')
    await nationCollection.deleteMany({})
  })

  const makeSut = (): PlayerMongoRepository => {
    return new PlayerMongoRepository()
  }

  test('Should return an player on success', async () => {
    const sut = makeSut()
    const player = await sut.add({
      name: 'any_name',
      cellphone: 'any_cellphone',
      matches: {},
      position: {}
    })
    expect(player).toBeTruthy()
    expect(player.name).toBe('any_name')
    expect(player.cellphone).toBe('any_cellphone')
    expect(player.matches).toEqual({})
    expect(player.position).toEqual({})
  })
})
