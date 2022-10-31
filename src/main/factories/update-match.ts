import { UpdateMatchController } from '../../presentation/controllers/match/update-match'
import { DbUpdateMatch } from '../../data/usecases/update-match/db-update-match'
import { MatchMongoRepository } from '../../infra/db/mongodb/match-repository/match'
import { Controller } from '../../presentation/protocols'
import { CountScore } from '../../presentation/protocols/countScore'

export const makeUpdateMatchController = (): Controller => {
  let countScore: CountScore
  const matchMongoRepository = new MatchMongoRepository()
  const dbUpdateMatch = new DbUpdateMatch(matchMongoRepository)
  const updateMatchController = new UpdateMatchController(dbUpdateMatch, countScore)
  return updateMatchController
}
