import { AddPositionController } from '../../presentation/controllers/position/add-position'
import { DbAddPosition } from '../../data/usecases/add-position/db-add-position'
import { PositionMongoRepository } from '../../infra/db/mongodb/position-repository/position'
import { Controller } from '../../presentation/protocols'

export const makeAddPositionController = (): Controller => {
  const positionMongoRepository = new PositionMongoRepository()
  const dbAddPosition = new DbAddPosition(positionMongoRepository)
  const addPositionController = new AddPositionController(dbAddPosition)
  return addPositionController
}
