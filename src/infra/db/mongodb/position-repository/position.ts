import { AddPositionRepository } from '../../../../data/protocols/add-position-repository'
import { PositionModel } from '../../../../domain/models/position'
import { ScoreModel } from '../../../../domain/models/score'
import { AddPositionModel } from '../../../../domain/usecases/add-position'
import { UpdatePositionModel } from '../../../../domain/usecases/update-position'
import { MongoHelper } from '../helpers/mongo-helper'

export class PositionMongoRepository implements AddPositionRepository {
  async add (positionData: AddPositionModel): Promise<PositionModel> {
    const positionCollection = await MongoHelper.getCollection('positions')
    const result = await positionCollection.insertOne(positionData)
    const playerCollection = await MongoHelper.getCollection('players')
    await playerCollection.find().forEach(async (playerDoc) => {
      let scoreUpdated: ScoreModel
      // eslint-disable-next-line prefer-const
      scoreUpdated = playerDoc.score
      playerDoc.position.forEach(async (positionItem) => {
        if ((positionData.code === positionItem.code)){
          const isFinals = positionData.code === 'finals'
          const firstCorrect = positionData.first === positionItem.first
          const secondCorrect = positionData.first === positionItem.first
          const thirdCorrect = positionData.first === positionItem.first
          const fourthCorrect = positionData.first === positionItem.first

          if (firstCorrect && !isFinals){
            scoreUpdated.groupPositionCorrect++
          }
          if (secondCorrect && !isFinals){
            scoreUpdated.groupPositionCorrect++
          }
          if (thirdCorrect && !isFinals){
            scoreUpdated.groupPositionCorrect++
          }
          if (fourthCorrect && !isFinals){
            scoreUpdated.groupPositionCorrect++
          }
          if (isFinals && firstCorrect){
            scoreUpdated.champion++
          }
          if (isFinals && secondCorrect){
            scoreUpdated.viceChampion++
          }
          if (isFinals && thirdCorrect){
            scoreUpdated.thirdPlace++
          }
        }
      })
      await playerCollection.updateOne(
        { _id: playerDoc._id },
        { $set: { score: scoreUpdated } }
      )
    })
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
