export interface UpdateMatchModel {
  code: string
  teamA: string
  scoreTeamA: number
  teamB: string
  scoreTeamB: number
  winner: string
}

export interface UpdateMatch {
  update (match: UpdateMatchModel): Promise<UpdateMatchModel>
}
