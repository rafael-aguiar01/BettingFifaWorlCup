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
          FirstRoundCorrectResult: 0,
          FirstRoundCorrectScore: 0,
          GroupPositionCorrect: 0,
          RoundOf16CorrectResult: 0,
          RoundOf16CorrectScore: 0,
          QuarterfinalsCorrectResult: 0,
          QuarterfinalsCorrectScore: 0,
          SemifinalsCorrectResult: 0,
          SemifinalsCorrectScore: 0,
          FinalsCorrectResult: 0,
          FinalsCorrectScore: 0,
          Champion: 0,
          ViceChampion: 0,
          ThirdPlace: 0,
          TotalPoints: 0
        }
      } else {
        scoreUpdated = playerDoc.score
      }
      playerDoc.matches.forEach(async function (matchItem){
        const correctWinner = matchData.winner === matchItem.winner
        const correctLooser = (matchData.teamA === matchItem.teamA || matchData.teamB === matchItem.teamB) && (!correctWinner)
        const scoreCorrect = (matchData.scoreTeamA === matchItem.scoreTeamA && matchData.scoreTeamB === matchItem.scoreTeamB)
        const resultCorrect = (matchData.scoreTeamA !== matchItem.scoreTeamA || matchData.scoreTeamB !== matchItem.scoreTeamB) && (correctWinner || correctLooser)
        const checkTwoTeams = (matchData.teamA === matchItem.teamA && matchData.teamB === matchItem.teamB)
        const checkOneTeam = (matchData.teamA === matchItem.teamA || matchData.teamB === matchItem.teamB)
        const firstRound = matchData.code <= 48
        const roundOf16 = matchData.code >= 49 && matchData.code <= 64
        const quarterFinals = matchData.code >= 65 && matchData.code <= 72
        const semiFinals = matchData.code >= 73 && matchData.code <= 76
        const finals = matchData.code >= 77 && matchData.code <= 78
        let swell: number

        if ((matchData.code === matchItem.code)){
          if (checkTwoTeams){ swell = 1 } else if (checkOneTeam) { swell = 0.5 } else { swell = 0 }
          if (firstRound){
            if (scoreCorrect){
              scoreUpdated.FirstRoundCorrectScore++
            }
            if (resultCorrect){
              scoreUpdated.FirstRoundCorrectResult++
            }
          }
          if (roundOf16){
            if (scoreCorrect){
              scoreUpdated.RoundOf16CorrectScore = scoreUpdated.RoundOf16CorrectScore + swell
            }
            if (resultCorrect){
              scoreUpdated.RoundOf16CorrectResult = scoreUpdated.RoundOf16CorrectResult + swell
            }
          }
          if (quarterFinals){
            if (scoreCorrect){
              scoreUpdated.QuarterfinalsCorrectScore = scoreUpdated.QuarterfinalsCorrectScore + swell
            }
            if (resultCorrect){
              scoreUpdated.QuarterfinalsCorrectResult = scoreUpdated.QuarterfinalsCorrectResult + swell
            }
          }
          if (semiFinals){
            if (scoreCorrect){
              scoreUpdated.SemifinalsCorrectScore = scoreUpdated.SemifinalsCorrectScore + swell
            }
            if (resultCorrect){
              scoreUpdated.SemifinalsCorrectResult = scoreUpdated.SemifinalsCorrectResult + swell
            }
          }
          if (finals){
            if (scoreCorrect){
              scoreUpdated.FinalsCorrectScore = scoreUpdated.FinalsCorrectScore + swell
            }
            if (resultCorrect){
              scoreUpdated.FinalsCorrectResult = scoreUpdated.FinalsCorrectResult + swell
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
