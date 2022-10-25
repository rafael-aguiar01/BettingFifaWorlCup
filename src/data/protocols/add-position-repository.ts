import { PositionModel } from '../../domain/models/position'
import { AddPositionModel } from '../../domain/usecases/add-position'

export interface AddPositionRepository {
  add (positionData: AddPositionModel): Promise<PositionModel>
}
