import { PointModel, AddPointModel, AddPoint, AddPointRepository } from './db-add-point-protocols'

export class DbAddPoint implements AddPoint {
  private readonly addPointRepository: AddPointRepository

  constructor (addPointRepository: AddPointRepository) {
    this.addPointRepository = addPointRepository
  }

  async add (pointData: AddPointModel): Promise<PointModel> {
    const point = this.addPointRepository.add(Object.assign({ }, pointData))
    return point
  }
}
