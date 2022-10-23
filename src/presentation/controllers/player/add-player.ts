import { HttpResponse, HttpRequest, Controller } from '../../protocols/'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { AddPlayer } from '../../../domain/usecases/add-player'

export class AddPlayerController implements Controller {
  private readonly addPlayer: AddPlayer

  constructor (addNation: AddPlayer) {
    this.addPlayer = addNation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse>{
    try {
      const requiredFields = [
        'name',
        'cellphone',
        'match',
        'teamA',
        'scoreTeamA',
        'teamB',
        'scoreTeamB',
        'winner'
      ]
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const {
        name,
        cellphone,
        match,
        teamA,
        scoreTeamA,
        teamB,
        scoreTeamB,
        winner
      } = httpRequest.body
      const nation = await this.addPlayer.add({
        name,
        cellphone,
        match,
        teamA,
        scoreTeamA,
        teamB,
        scoreTeamB,
        winner
      })
      return ok(nation)
    } catch (error) {
      return serverError(error)
    }
  }
}
