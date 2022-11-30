import { ListPointsController } from '../../presentation/controllers/point/list-points'
import { DbListPoints } from '../../data/usecases/list-points/db-list-points'
import { PointMongoRepository } from '../../infra/db/mongodb/point-repository/point'
import { Controller } from '../../presentation/protocols'

export const makeListPointsController = (): Controller => {
  const listPointsRepository = new PointMongoRepository()
  const dbListPoints = new DbListPoints(listPointsRepository)
  const listPointsController = new ListPointsController(dbListPoints)
  return listPointsController
}
