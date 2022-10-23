import { AddPosition } from '../../../domain/usecases/add-position'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'

export class AddPositionController implements Controller {
  private readonly addPosition: AddPosition

  constructor (addPosition: AddPosition) {
    this.addPosition = addPosition
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse>{
    try {
      const requiredFields = ['code', 'first', 'second', 'third', 'fourth']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { code, first, second, third, fourth } = httpRequest.body
      const nation = await this.addPosition.add({
        code,
        first,
        second,
        third,
        fourth
      })
      return ok(nation)
    } catch (error) {
      return serverError(error)
    }
  }
}
