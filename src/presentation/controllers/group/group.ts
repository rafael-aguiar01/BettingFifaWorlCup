import { AddGroup } from '../../../domain/usecases/add-group'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class AddGroupController implements Controller {
  private readonly addGroup: AddGroup

  constructor (addGroup: AddGroup) {
    this.addGroup = addGroup
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['code', 'teamA', 'teamB', 'teamC', 'teamD']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { code, teamA, teamB, teamC, teamD } = httpRequest.body
      const nation = await this.addGroup.add({
        code,
        teamA,
        teamB,
        teamC,
        teamD
      })
      return ok(nation)
    } catch (error) {
      return serverError(error)
    }
  }
}
