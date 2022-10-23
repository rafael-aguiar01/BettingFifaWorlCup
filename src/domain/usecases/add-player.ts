import { PlayerModel } from '../models/player'

export interface AddPlayerModel {
  name: string
  cellphone: string
  match: string
  teamA: string
  scoreTeamA: number
  teamB: string
  scoreTeamB: number
  winner: string
}

export interface AddPlayer {
  add (player: AddPlayerModel): Promise<PlayerModel>
}
