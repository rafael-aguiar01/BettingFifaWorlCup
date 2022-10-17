import { AddNationController } from './add-nation'

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
  })
})
