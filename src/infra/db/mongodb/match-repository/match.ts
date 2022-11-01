/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable space-unary-ops */

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
          THIRD: 0,
          TOTAL: 0
        }
      } else {
        scoreUpdated = playerDoc.score
      }
      playerDoc.matches.forEach(async function (matchItem){
        if ((matchData.code === matchItem.code)){
          let swell
          if (matchData.code <= 48){
            if (matchData.scoreTeamA === matchItem.scoreTeamA &&
                matchData.scoreTeamB === matchItem.scoreTeamB
            ){
              scoreUpdated.PC ++
            }
            if ((matchData.scoreTeamA !== matchItem.scoreTeamA ||
                matchData.scoreTeamB !== matchItem.scoreTeamB) &&
                matchData.winner === matchItem.winner
            ){
              scoreUpdated.RC ++
            }
          }
          if (matchData.code >= 49 && matchData.code <= 64){
            console.log('Oitavas de Final')
            if (matchData.teamA === matchItem.teamA &&
                matchData.teamB === matchItem.teamB
            ){ swell = 1 } else { swell = 0.5 }
            if (matchData.scoreTeamA === matchItem.scoreTeamA &&
                matchData.scoreTeamB === matchItem.scoreTeamB
            ){
              scoreUpdated.PC2 = scoreUpdated.PC2 + swell
            }
            if ((matchData.scoreTeamA !== matchItem.scoreTeamA ||
                matchData.scoreTeamB !== matchItem.scoreTeamB) &&
                matchData.winner === matchItem.winner
            ){
              scoreUpdated.RC2 = scoreUpdated.RC2 + swell
            }
          }
          if (matchData.code >= 65 && matchData.code <= 72){
            console.log('Quartas de Final')
            if (matchData.teamA === matchItem.teamA &&
                matchData.teamB === matchItem.teamB
            ){ swell = 1 } else { swell = 0.5 }
            if (matchData.scoreTeamA === matchItem.scoreTeamA &&
                matchData.scoreTeamB === matchItem.scoreTeamB
            ){
              scoreUpdated.PC3 = scoreUpdated.PC3 + swell
            }
            if ((matchData.scoreTeamA !== matchItem.scoreTeamA ||
                matchData.scoreTeamB !== matchItem.scoreTeamB) &&
                matchData.winner === matchItem.winner
            ){
              scoreUpdated.RC3 = scoreUpdated.RC3 + swell
            }
          }
          if (matchData.code >= 73 && matchData.code <= 76){
            console.log('Semi Final')
            if (matchData.teamA === matchItem.teamA &&
                matchData.teamB === matchItem.teamB
            ){ swell = 1 } else { swell = 0.5 }
            if (matchData.scoreTeamA === matchItem.scoreTeamA &&
                matchData.scoreTeamB === matchItem.scoreTeamB
            ){
              scoreUpdated.PC4 = scoreUpdated.PC4 + swell
            }
            if ((matchData.scoreTeamA !== matchItem.scoreTeamA ||
                matchData.scoreTeamB !== matchItem.scoreTeamB) &&
                matchData.winner === matchItem.winner
            ){
              scoreUpdated.RC4 = scoreUpdated.RC4 + swell
            }
          }
          if (matchData.code >= 77 && matchData.code <= 78){
            console.log('Final')
            if (matchData.teamA === matchItem.teamA &&
                matchData.teamB === matchItem.teamB
            ){ swell = 1 } else { swell = 0.5 }
            if (matchData.scoreTeamA === matchItem.scoreTeamA &&
                matchData.scoreTeamB === matchItem.scoreTeamB
            ){
              scoreUpdated.PC5 = scoreUpdated.PC5 + swell
            }
            if ((matchData.scoreTeamA !== matchItem.scoreTeamA ||
                matchData.scoreTeamB !== matchItem.scoreTeamB) &&
                matchData.winner === matchItem.winner
            ){
              scoreUpdated.RC5 = scoreUpdated.RC5 + swell
            }
          }
        }
      })
      await playerCollection.updateOne(
        { _id: playerDoc._id },
        { $set: { score: scoreUpdated } }
      )
    })
    return MongoHelper.map(result.value)
  }
}
