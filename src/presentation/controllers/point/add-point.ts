import { AddPoint } from '../../../domain/usecases/add-point'
import { MissingParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class AddPointController implements Controller {
  private readonly addPoint: AddPoint

  constructor (addPoint: AddPoint){
    this.addPoint = addPoint
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['code', 'point']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { code, point } = httpRequest.body
      const dataPoint = await this.addPoint.add({
        code,
        point
      })
      return ok(dataPoint)
    } catch (error) {
      return serverError(error)
    }
  }
}
