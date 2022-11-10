import { PositionModel, UpdatePositionModel, UpdatePosition } from './db-update-position-protocols'
import { UpdatePositionRepository } from '../../protocols/update-position-repository'

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
