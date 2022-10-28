import { MatchModel } from '../../domain/models/match'
import { UpdateMatchModel } from '../../domain/usecases/update-match'

export interface UpdateMatchRepository {
  update (match: UpdateMatchModel): Promise<MatchModel>
}
