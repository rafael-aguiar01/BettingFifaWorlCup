import { AddGroupRepository } from '../../../../data/protocols/add-group-repository'
import { GroupModel } from '../../../../domain/models/group'
import { AddGroupModel } from '../../../../domain/usecases/add-group'
import { MongoHelper } from '../helpers/mongo-helper'

export class GroupMongoRepository implements AddGroupRepository {
  async add (nationData: AddGroupModel): Promise<GroupModel> {
    const nationCollection = await MongoHelper.getCollection('groups')
    const result = await nationCollection.insertOne(nationData)
    return MongoHelper.map(result.ops[0])
  }
}
