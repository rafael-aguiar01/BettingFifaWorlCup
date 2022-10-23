import { AddNationRepository } from '../../../../data/protocols/add-nation-repository'
import { NationModel } from '../../../../domain/models/nation'
import { AddNationModel } from '../../../../domain/usecases/add-nation'
import { MongoHelper } from '../helpers/mongo-helper'

export class NationMongoRepository implements AddNationRepository {
  async add (nationData: AddNationModel): Promise<NationModel> {
    const nationCollection = await MongoHelper.getCollection('nations')
    const result = await nationCollection.insertOne(nationData)
    return MongoHelper.map(result.ops[0])
  }
}
