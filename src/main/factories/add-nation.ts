import { AddNationController } from '../../presentation/controllers/nation/add-nation'
import { DbAddNation } from '../../data/usecases/add-nation/db-add-nation'
import { NationMongoRepository } from '../../infra/db/mongodb/nation-repository/nation'
import { Controller } from '../../presentation/protocols'

export const makeAddNationController = (): Controller => {
  const nationMongoRepository = new NationMongoRepository()
  const dbAddNation = new DbAddNation(nationMongoRepository)
  const addNationController = new AddNationController(dbAddNation)
  return addNationController
}
