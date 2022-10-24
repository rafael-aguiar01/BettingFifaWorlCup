import { AddPlayerController } from './add-player'
import { MissingParamError, ServerError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { PlayerModel } from '../../../domain/models/player'
import { HttpRequest } from '../../protocols'
import { AddPlayer, AddPlayerModel } from '../../../domain/usecases/add-player'

const makeFakePlayer = (): PlayerModel => ({
  name: 'valid_name',
  cellphone: 'cellphone_number',
  matches: {},
  position: {}
})

const makeFakeRequest = (): HttpRequest => ({
  body: ({
    name: 'valid_name',
    cellphone: 'cellphone_number',
    matches: {},
    position: {}
  })
})

const makeAddPlayer = (): AddPlayer => {
  class AddPlayerStub implements AddPlayer {
    async add (player: AddPlayerModel): Promise<PlayerModel> {
      return new Promise(resolve => resolve(makeFakePlayer()))
    }
  }
  return new AddPlayerStub()
}

interface SutTypes{
  sut: AddPlayerController
  addPlayerStub: AddPlayer
}

const makeSut = (): SutTypes => {
  const addPlayerStub = makeAddPlayer()
  const sut = new AddPlayerController(addPlayerStub)
  return {
    sut,
    addPlayerStub
  }
}

describe('AddPlayer Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cellphone: 'cellphone_number',
        matches: {},
        position: {}
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no matches is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        cellphone: 'cellphone_number',
        position: {}
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('matches')))
  })

  test('Should return 400 if no cellphone is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        matches: {},
        position: {}
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('cellphone')))
  })

  test('Should return 400 if no position is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        cellphone: 'cellphone_number',
        matches: {}
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('position')))
  })

  test('Should call AddPlayer with correct values', async () => {
    const { sut, addPlayerStub } = makeSut()
    const addSpy = jest.spyOn(addPlayerStub, 'add')
    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      cellphone: 'cellphone_number',
      matches: {},
      position: {}
    })
  })

  test('Should return 500 if AddAcount throws', async () => {
    const { sut, addPlayerStub } = makeSut()
    jest.spyOn(addPlayerStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
