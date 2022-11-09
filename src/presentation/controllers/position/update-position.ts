import { HttpResponse, HttpRequest, Controller } from '../../protocols'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { UpdatePosition } from '../../../domain/usecases/update-position'

export class UpdatePositionController implements Controller {
  private readonly updatePosition: UpdatePosition

  constructor (updatePosition: UpdatePosition) {
    this.updatePosition = updatePosition
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
      const match = await this.updatePosition.update({
        code,
        first,
        second,
        third,
        fourth
      })
      return ok(match)
    } catch (error) {
      return serverError(error)
    }
  }
}
