import { AddPointController } from '../../presentation/controllers/point/add-point'
import { DbAddPoint } from '../../data/usecases/add-point/db-add-point'
import { PointMongoRepository } from '../../infra/db/mongodb/point-repository/point'
import { Controller } from '../../presentation/protocols'

export const makeAddPointController = (): Controller => {
  const pointMongoRepository = new PointMongoRepository()
  const dbAddPoint = new DbAddPoint(pointMongoRepository)
  const addPointController = new AddPointController(dbAddPoint)
  return addPointController
}
