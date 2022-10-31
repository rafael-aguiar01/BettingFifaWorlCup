import { HttpResponse, HttpRequest, Controller } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateMatch } from '../../../domain/usecases/update-match'
import { CountScore } from '../../protocols/countScore'

export class UpdateMatchController implements Controller {
  private readonly updateMatch: UpdateMatch
  private readonly countScore: CountScore

  constructor (updateMatch: UpdateMatch, countScore: CountScore) {
    this.updateMatch = updateMatch
    this.countScore = countScore
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse>{
    try {
      const requiredFields = ['code', 'teamA', 'scoreTeamA', 'teamB', 'scoreTeamB', 'winner']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { code, teamA, scoreTeamA, teamB, scoreTeamB, winner } = httpRequest.body
      const isOk = this.countScore.isOk(code, scoreTeamA, scoreTeamB, winner)
      if (!isOk) {
        return badRequest(new MissingParamError(code))
      }
      const match = await this.updateMatch.update({
        code,
        teamA,
        scoreTeamA,
        teamB,
        scoreTeamB,
        winner
      })
      return ok(match)
    } catch (error) {
      return serverError(error)
    }
  }
}
