import { PlayerModel } from '../../domain/models/player'
import { AddPlayerModel } from '../../domain/usecases/add-player'

export interface AddPlayerRepository {
  add (playerData: AddPlayerModel): Promise<PlayerModel>
}
