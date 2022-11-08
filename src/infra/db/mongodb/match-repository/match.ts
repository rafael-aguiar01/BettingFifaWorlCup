/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { AddMatchRepository } from '../../../../data/protocols/add-match-repository'
import { MatchModel } from '../../../../domain/models/match'
import { ScoreModel } from '../../../../domain/models/score'
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
      let scoreUpdated: ScoreModel
      if (!playerDoc.score){
        scoreUpdated = {
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
      } else {
        scoreUpdated = playerDoc.score
      }
      playerDoc.matches.forEach(async function (matchItem){
        const correctWinner = matchData.winner === matchItem.winner
        const correctLooser = (matchData.teamA === matchItem.teamA || matchData.teamB === matchItem.teamB) && (!correctWinner)
        const scoreCorrect = (matchData.scoreTeamA === matchItem.scoreTeamA && matchData.scoreTeamB === matchItem.scoreTeamB)
        const resultCorrect = (!scoreCorrect && (matchData.scoreTeamA !== matchItem.scoreTeamA || matchData.scoreTeamB !== matchItem.scoreTeamB)) && (correctWinner || correctLooser)
        const checkTwoTeams = (matchData.teamA === matchItem.teamA && matchData.teamB === matchItem.teamB)
        const checkOneTeam = (matchData.teamA === matchItem.teamA || matchData.teamB === matchItem.teamB)
        let swell: number

        if ((matchData.code === matchItem.code)){
          if (checkTwoTeams){ swell = 1 } else if (checkOneTeam) { swell = 0.5 } else { swell = 0 }
          if (scoreCorrect){
            scoreUpdated[matchItem.phase + 'CorrectScore'] = scoreUpdated[matchItem.phase + 'CorrectScore'] + swell
          }
          if (resultCorrect){
            scoreUpdated[matchItem.phase + 'CorrectResult'] = scoreUpdated[matchItem.phase + 'CorrectResult'] + swell
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
