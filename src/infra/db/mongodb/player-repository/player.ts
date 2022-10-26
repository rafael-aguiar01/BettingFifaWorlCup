import { AddPlayerRepository } from '../../../../data/protocols/add-player-repository'
import { PlayerModel } from '../../../../domain/models/player'
import { AddPlayerModel } from '../../../../domain/usecases/add-player'
import { MongoHelper } from '../helpers/mongo-helper'

export class PlayerMongoRepository implements AddPlayerRepository {
  async add (playerData: AddPlayerModel): Promise<PlayerModel> {
    const playerCollection = await MongoHelper.getCollection('players')
    const result = await playerCollection.insertOne(playerData)
    return MongoHelper.map(result.ops[0])
  }
}
