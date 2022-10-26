import { AddMatchController } from '../../presentation/controllers/match/match'
import { DbAddMatch } from '../../data/usecases/add-match/db-add-match'
import { MatchMongoRepository } from '../../infra/db/mongodb/match-repository/match'
import { Controller } from '../../presentation/protocols'

export const makeAddMatchController = (): Controller => {
  const matchMongoRepository = new MatchMongoRepository()
  const dbAddMatch = new DbAddMatch(matchMongoRepository)
  const addMatchController = new AddMatchController(dbAddMatch)
  return addMatchController
}
