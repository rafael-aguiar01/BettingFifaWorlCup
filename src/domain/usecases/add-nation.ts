import { NationModel } from '../models/nation'

export interface AddNationModel {
  code: string
  name: string
}

export interface AddNation {
  add (account: AddNationModel): Promise<NationModel>
}
