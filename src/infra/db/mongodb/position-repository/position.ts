import { AddPositionRepository } from '../../../../data/protocols/add-position-repository'
import { PositionModel } from '../../../../domain/models/position'
import { AddPositionModel } from '../../../../domain/usecases/add-position'
import { UpdatePositionModel } from '../../../../domain/usecases/update-position'
import { MongoHelper } from '../helpers/mongo-helper'

export class PositionMongoRepository implements AddPositionRepository {
  async add (positionData: AddPositionModel): Promise<PositionModel> {
    const positionCollection = await MongoHelper.getCollection('positions')
    const result = await positionCollection.insertOne(positionData)
    return MongoHelper.map(result.ops[0])
  }

  async update (positionData: UpdatePositionModel): Promise<PositionModel>{
    const matchCollection = await MongoHelper.getCollection('positions')
    const result = await matchCollection.findOneAndUpdate(
      { code: positionData.code },
      { $set: { code: positionData.code, first: positionData.first, second: positionData.second, third: positionData.third, fourth: positionData.fourth } }
    )
    return MongoHelper.map(result.value)
  }
}
