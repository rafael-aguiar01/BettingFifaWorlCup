import { PositionModel, AddPositionModel, AddPosition, AddPositionRepository } from './db-add-position-protocols'

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
