import { AddGroupController } from '../../presentation/controllers/group/group'
import { DbAddGroup } from '../../data/usecases/add-group/db-add-group'
import { GroupMongoRepository } from '../../infra/db/mongodb/group-repository/group'
import { Controller } from '../../presentation/protocols'

export const makeAddGroupController = (): Controller => {
  const groupMongoRepository = new GroupMongoRepository()
  const dbAddGroup = new DbAddGroup(groupMongoRepository)
  const addGroupController = new AddGroupController(dbAddGroup)
  return addGroupController
}
