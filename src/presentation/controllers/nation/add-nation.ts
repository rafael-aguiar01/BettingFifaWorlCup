import { HttpResponse, HttpRequest } from '../../protocols/http'

export class AddNationController {
  handle (httpRequest: HttpRequest): HttpResponse{
    if (!httpRequest.body.code){
      return {
        statusCode: 400,
        body: new Error('Missing param: code')
      }
    }
    if (!httpRequest.body.name){
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
  }
}
