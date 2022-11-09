import { AddPlayerRepository } from '../../../../data/protocols/add-player-repository'
import { PlayerModel } from '../../../../domain/models/player'
import { AddPlayerModel } from '../../../../domain/usecases/add-player'
import { MongoHelper } from '../helpers/mongo-helper'

export class PlayerMongoRepository implements AddPlayerRepository {
  async add (playerData: AddPlayerModel): Promise<PlayerModel> {
    playerData.score = {
      firstRoundCorrectResult: 0,
      firstRoundCorrectScore: 0,
      groupPositionCorrect: 0,
      roundOf16CorrectResult: 0,
      roundOf16CorrectScore: 0,
      quarterfinalsCorrectResult: 0,
      quarterfinalsCorrectScore: 0,
      semifinalsCorrectResult: 0,
      semifinalsCorrectScore: 0,
      finalsCorrectResult: 0,
      finalsCorrectScore: 0,
      champion: 0,
      viceChampion: 0,
      thirdPlace: 0,
      totalPoints: 0
    }
    const playerCollection = await MongoHelper.getCollection('players')
    const result = await playerCollection.insertOne(playerData)
    return MongoHelper.map(result.ops[0])
  }
}
