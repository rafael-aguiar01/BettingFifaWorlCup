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
    await playerCollection.find().forEach(async (playerDoc) => {
      let scoreUpdated: ScoreModel
      // eslint-disable-next-line prefer-const
      scoreUpdated = playerDoc.score
      playerDoc.matches.forEach(async (matchItem) => {
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
            scoreUpdated[String(matchItem.phase) + 'CorrectScore'] = Number(scoreUpdated[String(matchItem.phase) + 'CorrectScore']) + swell
          }
          if (resultCorrect){
            scoreUpdated[String(matchItem.phase) + 'CorrectResult'] = Number(scoreUpdated[String(matchItem.phase) + 'CorrectResult']) + swell
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
