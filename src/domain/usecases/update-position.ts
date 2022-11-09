export interface UpdatePositionModel {
  code: string
  first: string
  second: string
  third: string
  fourth: string
}

export interface UpdatePosition {
  update (position: UpdatePositionModel): Promise<UpdatePositionModel>
}
