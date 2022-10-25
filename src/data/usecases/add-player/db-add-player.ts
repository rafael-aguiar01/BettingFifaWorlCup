import { PlayerModel } from '../../../domain/models/player'
import { AddPlayerModel, AddPlayer } from '../../../domain/usecases/add-player'
import { AddPlayerRepository } from '../../protocols/add-player-repository'

export class DbAddPlayer implements AddPlayer {
  private readonly addPlayerRepository: AddPlayerRepository

  constructor (addPlayerRepository: AddPlayerRepository) {
    this.addPlayerRepository = addPlayerRepository
  }

  async add (playerData: AddPlayerModel): Promise<PlayerModel> {
    const player = this.addPlayerRepository.add(Object.assign({ }, playerData))
    return player
  }
}
