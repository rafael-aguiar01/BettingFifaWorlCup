import { PointModel } from '../models/point'

export interface AddPointModel {
  code: string
  point: number
}

export interface AddPoint {
  add (point: AddPointModel): Promise<PointModel>
}
