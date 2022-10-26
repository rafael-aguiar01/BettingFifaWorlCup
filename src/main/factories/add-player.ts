import { AddPlayerController } from '../../presentation/controllers/player/add-player'
import { DbAddPlayer } from '../../data/usecases/add-player/db-add-player'
import { PlayerMongoRepository } from '../../infra/db/mongodb/player-repository/player'
import { Controller } from '../../presentation/protocols'

export const makeAddPlayerController = (): Controller => {
  const playerMongoRepository = new PlayerMongoRepository()
  const dbAddPlayer = new DbAddPlayer(playerMongoRepository)
  const addPlayerController = new AddPlayerController(dbAddPlayer)
  return addPlayerController
}
