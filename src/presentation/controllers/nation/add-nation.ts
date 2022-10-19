import { HttpResponse, HttpRequest } from '../../protocols/http'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { AddNation } from '../../../domain/usecases/add-nation'
import { Controller } from '../../protocols/controller'

export class AddNationController implements Controller {
  private readonly addNation: AddNation

  constructor (addNation: AddNation) {
    this.addNation = addNation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse>{
    try {
      const requiredFields = ['code', 'name']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { code, name } = httpRequest.body
      const nation = await this.addNation.add({
        code,
        name
      })
      return ok(nation)
    } catch (error) {
      return serverError(error)
    }
  }
}
