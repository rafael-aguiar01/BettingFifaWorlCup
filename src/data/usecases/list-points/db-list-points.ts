import { ListPoints } from '../../../domain/usecases/list-point'
import { ListPointsRepository } from '../../protocols/list-points-repository'

export class DbListPoints implements ListPoints {
  private readonly listPointsRepository: ListPointsRepository

  constructor (listPointsRepository: ListPointsRepository) {
    this.listPointsRepository = listPointsRepository
  }

  async list (): Promise<any> {
    const list = this.listPointsRepository.list()
    return list
  }
}
