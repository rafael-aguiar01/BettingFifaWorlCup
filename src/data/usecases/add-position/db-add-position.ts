import { PositionModel } from '../../../domain/models/position'
import { AddPositionModel, AddPosition } from '../../../domain/usecases/add-position'
import { AddPositionRepository } from '../../protocols/add-position-repository'

export class DbAddPosition implements AddPosition {
  private readonly addPositionRepository: AddPositionRepository

  constructor (addPositionRepository: AddPositionRepository) {
    this.addPositionRepository = addPositionRepository
  }

  async add (positionData: AddPositionModel): Promise<PositionModel> {
    const position = this.addPositionRepository.add(Object.assign({ }, positionData))
    return position
  }
}
