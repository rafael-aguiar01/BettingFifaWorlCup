import { AddNationController } from './add-nation'
import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'

describe('AddNation Controller', () => {
  test('Should return 400 if no code is provided', () => {
    const sut = new AddNationController()
    const httpRequest = {
      body: {
        name: 'any_name'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('code')))
  })
  test('Should return 400 if no name is provided', () => {
    const sut = new AddNationController()
    const httpRequest = {
      body: {
        code: 'any_code'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })
})
