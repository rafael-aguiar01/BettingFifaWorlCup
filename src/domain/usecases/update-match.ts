export interface UpdateMatchModel {
  code: string
  scoreTeamA: number
  scoreTeamB: number
  winner: string
}

export interface UpdateMatch {
  update (match: UpdateMatchModel): Promise<UpdateMatchModel>
}
