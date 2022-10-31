export interface CountScore {
  isOk (
    code: number,
    scoreTeamA: number,
    scoreTeamB: number,
    winner: string
  ): any
}
