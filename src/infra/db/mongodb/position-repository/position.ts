import { AddPositionRepository } from '../../../../data/protocols/add-position-repository'
import { PositionModel } from '../../../../domain/models/position'
import { AddPositionModel } from '../../../../domain/usecases/add-position'
import { MongoHelper } from '../helpers/mongo-helper'

export class PositionMongoRepository implements AddPositionRepository {
  async add (positionData: AddPositionModel): Promise<PositionModel> {
    const positionCollection = await MongoHelper.getCollection('positions')
    const result = await positionCollection.insertOne(positionData)
    return MongoHelper.map(result.ops[0])
  }
}
