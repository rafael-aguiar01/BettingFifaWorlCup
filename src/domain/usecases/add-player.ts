import { PlayerModel } from '../models/player'

export interface AddPlayerModel {
  name: string
  cellphone: string
  matches: object
  position: object
  score?: object
}

export interface AddPlayer {
  add (player: AddPlayerModel): Promise<PlayerModel>
}
