import { ok } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { ListPoints } from '../../../domain/usecases/list-point'

export class ListPointsController implements Controller {
  private readonly listPoints: ListPoints

  constructor (listPoints: ListPoints){
    this.listPoints = listPoints
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const listPoints = await this.listPoints.list()
    return ok(listPoints)
  }
}
