import { PlayerModel, AddPlayerModel, AddPlayer, AddPlayerRepository } from './db-add-player-protocols'

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
