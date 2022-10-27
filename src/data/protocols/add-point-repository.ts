import { PointModel } from '../../domain/models/point'
import { AddPointModel } from '../../domain/usecases/add-point'

export interface AddPointRepository {
  add (pointData: AddPointModel): Promise<PointModel>
}
