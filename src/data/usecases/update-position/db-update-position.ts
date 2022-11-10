import { PositionModel, UpdatePositionModel, UpdatePosition, UpdatePositionRepository } from './db-update-position-protocols'

export class DbUpdatePosition implements UpdatePosition {
  private readonly updatePositionRepository: UpdatePositionRepository

  constructor (updatePositionRepository: UpdatePositionRepository) {
    this.updatePositionRepository = updatePositionRepository
  }

  async update (position: UpdatePositionModel): Promise<PositionModel> {
    const positionUpdated = this.updatePositionRepository.update(Object.assign({ }, position))
    return positionUpdated
  }
}
