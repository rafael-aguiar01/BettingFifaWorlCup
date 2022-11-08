export interface UpdateMatchModel {
  code: number
  teamA: string
  scoreTeamA?: number
  teamB: string
  scoreTeamB?: number
  winner?: string
  phase: string
}

export interface UpdateMatch {
  update (match: UpdateMatchModel): Promise<UpdateMatchModel>
}
