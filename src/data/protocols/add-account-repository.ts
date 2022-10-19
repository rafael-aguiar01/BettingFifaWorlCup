import { NationModel } from '../../domain/models/nation'
import { AddNationModel } from '../../domain/usecases/add-nation'

export interface AddNationRepository {
  add (nationData: AddNationModel): Promise<NationModel>
}
