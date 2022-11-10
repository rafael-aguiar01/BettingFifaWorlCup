import { PositionModel } from '../../domain/models/position'
import { UpdatePositionModel } from '../../domain/usecases/update-position'

export interface UpdatePositionRepository {
  update (match: UpdatePositionModel): Promise<PositionModel>
}
