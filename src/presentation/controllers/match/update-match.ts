import { HttpResponse, HttpRequest, Controller } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdateMatch } from '../../../domain/usecases/update-match'

export class UpdateMatchController implements Controller {
  private readonly updateMatch: UpdateMatch

  constructor (updateMatch: UpdateMatch) {
    this.updateMatch = updateMatch
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
