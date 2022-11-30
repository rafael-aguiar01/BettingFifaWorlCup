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
      const firstRoundCorrectResult = 6
      const firstRoundCorrectScore = 10
      const groupPositionCorrect = 10
      const roundOf16CorrectResult = 15
      const roundOf16CorrectScore = 20
      const quarterfinalsCorrectResult = 30
      const quarterfinalsCorrectScore = 40
      const semifinalsCorrectResult = 50
      const semifinalsCorrectScore = 70
      const finalsCorrectResult = 70
      const finalsCorrectScore = 100
      const champion = 200
      const viceChampion = 75
      const thirdPlace = 50

      scoreUpdated.totalPoints = (scoreUpdated.firstRoundCorrectResult * firstRoundCorrectResult) +
                                 (scoreUpdated.firstRoundCorrectScore * firstRoundCorrectScore) +
                                 (scoreUpdated.groupPositionCorrect * groupPositionCorrect) +
                                 (scoreUpdated.roundOf16CorrectResult * roundOf16CorrectResult) +
                                 (scoreUpdated.roundOf16CorrectScore * roundOf16CorrectScore) +
                                 (scoreUpdated.quarterfinalsCorrectResult * quarterfinalsCorrectResult) +
                                 (scoreUpdated.quarterfinalsCorrectScore * quarterfinalsCorrectScore) +
                                 (scoreUpdated.semifinalsCorrectResult * semifinalsCorrectResult) +
                                 (scoreUpdated.semifinalsCorrectScore * semifinalsCorrectScore) +
                                 (scoreUpdated.finalsCorrectResult * finalsCorrectResult) +
                                 (scoreUpdated.finalsCorrectScore * finalsCorrectScore) +
                                 (scoreUpdated.champion * champion) +
                                 (scoreUpdated.viceChampion * viceChampion) +
                                 (scoreUpdated.thirdPlace * thirdPlace)
      await playerCollection.updateOne(
        { _id: playerDoc._id },
        { $set: { score: scoreUpdated } }
      )
    })
    return MongoHelper.map(result.value)
  }
}
