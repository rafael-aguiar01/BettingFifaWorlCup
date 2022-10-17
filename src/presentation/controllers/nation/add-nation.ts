import { HttpResponse, HttpRequest } from '../../protocols/http'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'

export class AddNationController {
  handle (httpRequest: HttpRequest): HttpResponse{
    const requiredFields = ['code', 'name']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
