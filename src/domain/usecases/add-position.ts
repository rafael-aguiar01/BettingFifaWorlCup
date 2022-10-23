import { PositionModel } from '../models/position'

export interface AddPositionModel {
  code: string
  first: string
  second: string
  third: string
  fourth: string
}

export interface AddPosition {
  add (position: AddPositionModel): Promise<PositionModel>
}
