import { HttpResponse, HttpRequest, Controller } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { AddMatch } from '../../../domain/usecases/add-match'

export class AddMatchController implements Controller {
  private readonly addMatch: AddMatch

  constructor (addMatch: AddMatch) {
    this.addMatch = addMatch
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse>{
    try {
      const requiredFields = ['code', 'teamA', 'teamB', 'phase']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { code, teamA, teamB, phase } = httpRequest.body
      const match = await this.addMatch.add({
        code,
        teamA,
        teamB,
        phase
      })
      return ok(match)
    } catch (error) {
      return serverError(error)
    }
  }
}
