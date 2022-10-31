import { AddMatchRepository } from '../../../../data/protocols/add-match-repository'
import { MatchModel } from '../../../../domain/models/match'
import { AddMatchModel } from '../../../../domain/usecases/add-match'
import { UpdateMatchModel } from '../../../../domain/usecases/update-match'
import { MongoHelper } from '../helpers/mongo-helper'

export class MatchMongoRepository implements AddMatchRepository {
  async add (matchData: AddMatchModel): Promise<MatchModel> {
    const matchCollection = await MongoHelper.getCollection('matches')
    const result = await matchCollection.insertOne(matchData)
    return MongoHelper.map(result.ops[0])
  }

  async update (matchData: UpdateMatchModel): Promise<MatchModel> {
    const matchCollection = await MongoHelper.getCollection('matches')
    const result = await matchCollection.findOneAndUpdate(
      { code: matchData.code },
      { $set: { scoreTeamA: matchData.scoreTeamA, scoreTeamB: matchData.scoreTeamB, winner: matchData.winner } }
    )
    const playerCollection = await MongoHelper.getCollection('players')
    await playerCollection.find().forEach(async function (playerDoc) {
      let scoreUpdated
      if (!playerDoc.score){
        scoreUpdated = {
          RC: 0,
          PC: 0,
          LC: 0,
          RC2: 0,
          PC2: 0,
          RC3: 0,
          PC3: 0,
          RC4: 0,
          PC4: 0,
          RC5: 0,
          PC5: 0,
          CC: 0,
          VC: 0,
          THI: 0
        }
      }
      await playerCollection.updateOne(
        { _id: playerDoc._id },
        { $set: { score: scoreUpdated } }
      )
    })
    return MongoHelper.map(result.value)
  }
}
