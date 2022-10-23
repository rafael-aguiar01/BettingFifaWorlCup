import { MatchModel } from '../models/match'

export interface AddMatchModel {
  code: string
  teamA: string
  scoreTeamA: number
  teamB: string
  scoreTeamB: number
  winner: string
}

export interface AddMatch {
  add (match: AddMatchModel): Promise<MatchModel>
}
